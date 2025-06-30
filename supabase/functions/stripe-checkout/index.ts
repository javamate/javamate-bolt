import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'Bolt Integration',
    version: '1.0.0',
  },
});

// Helper function to create responses with CORS headers
function corsResponse(body: string | object | null, status = 200) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': '*',
  };

  // For 204 No Content, don't include Content-Type or body
  if (status === 204) {
    return new Response(null, { status, headers });
  }

  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  });
}

Deno.serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return corsResponse({}, 204);
    }

    if (req.method !== 'POST') {
      return corsResponse({ error: 'Method not allowed' }, 405);
    }

    const { line_items, price_id, variant_data, success_url, cancel_url, mode } = await req.json();

    // Validate required parameters
    if (!success_url || !cancel_url) {
      return corsResponse({ error: 'Missing required URLs' }, 400);
    }

    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const {
      data: { user },
      error: getUserError,
    } = await supabase.auth.getUser(token);

    if (getUserError) {
      return corsResponse({ error: 'Failed to authenticate user' }, 401);
    }

    if (!user) {
      return corsResponse({ error: 'User not found' }, 404);
    }

    const { data: customer, error: getCustomerError } = await supabase
      .from('stripe_customers')
      .select('customer_id')
      .eq('user_id', user.id)
      .is('deleted_at', null)
      .maybeSingle();

    if (getCustomerError) {
      console.error('Failed to fetch customer information from the database', getCustomerError);
      return corsResponse({ error: 'Failed to fetch customer information' }, 500);
    }

    let customerId;

    /**
     * In case we don't have a mapping yet, the customer does not exist and we need to create one.
     */
    if (!customer || !customer.customer_id) {
      const newCustomer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user.id,
        },
      });

      console.log(`Created new Stripe customer ${newCustomer.id} for user ${user.id}`);

      const { error: createCustomerError } = await supabase.from('stripe_customers').insert({
        user_id: user.id,
        customer_id: newCustomer.id,
      });

      if (createCustomerError) {
        console.error('Failed to save customer information in the database', createCustomerError);

        // Try to clean up both the Stripe customer and subscription record
        try {
          await stripe.customers.del(newCustomer.id);
          await supabase.from('stripe_subscriptions').delete().eq('customer_id', newCustomer.id);
        } catch (deleteError) {
          console.error('Failed to clean up after customer mapping error:', deleteError);
        }

        return corsResponse({ error: 'Failed to create customer mapping' }, 500);
      }

      if (mode === 'subscription') {
        const { error: createSubscriptionError } = await supabase.from('stripe_subscriptions').insert({
          customer_id: newCustomer.id,
          status: 'not_started',
        });

        if (createSubscriptionError) {
          console.error('Failed to save subscription in the database', createSubscriptionError);

          // Try to clean up the Stripe customer since we couldn't create the subscription
          try {
            await stripe.customers.del(newCustomer.id);
          } catch (deleteError) {
            console.error('Failed to delete Stripe customer after subscription creation error:', deleteError);
          }

          return corsResponse({ error: 'Unable to save the subscription in the database' }, 500);
        }
      }

      customerId = newCustomer.id;

      console.log(`Successfully set up new customer ${customerId} with subscription record`);
    } else {
      customerId = customer.customer_id;

      if (mode === 'subscription') {
        // Verify subscription exists for existing customer
        const { data: subscription, error: getSubscriptionError } = await supabase
          .from('stripe_subscriptions')
          .select('status')
          .eq('customer_id', customerId)
          .maybeSingle();

        if (getSubscriptionError) {
          console.error('Failed to fetch subscription information from the database', getSubscriptionError);
          return corsResponse({ error: 'Failed to fetch subscription information' }, 500);
        }

        if (!subscription) {
          // Create subscription record for existing customer if missing
          const { error: createSubscriptionError } = await supabase.from('stripe_subscriptions').insert({
            customer_id: customerId,
            status: 'not_started',
          });

          if (createSubscriptionError) {
            console.error('Failed to create subscription record for existing customer', createSubscriptionError);
            return corsResponse({ error: 'Failed to create subscription record for existing customer' }, 500);
          }
        }
      }
    }

    // Process line items - either multiple items or single item
    let checkoutLineItems: any[] = [];

    if (line_items && Array.isArray(line_items)) {
      // Process multiple line items individually
      for (const lineItem of line_items) {
        let finalPriceId = lineItem.price_id;

        // If no price_id provided but variant_data is available, create a new price
        if (!finalPriceId && lineItem.variant_data) {
          try {
            const price = await stripe.prices.create({
              unit_amount: Math.round(lineItem.variant_data.price * 100), // Convert to cents
              currency: 'usd',
              product_data: {
                name: `${lineItem.variant_data.product_name} - ${lineItem.variant_data.size} ${lineItem.variant_data.grind === 'whole-bean' ? 'Whole Bean' : lineItem.variant_data.grind}`,
                metadata: {
                  variant_id: lineItem.variant_data.variant_id,
                  size: lineItem.variant_data.size,
                  grind: lineItem.variant_data.grind,
                },
              },
              metadata: {
                variant_id: lineItem.variant_data.variant_id,
                size: lineItem.variant_data.size,
                grind: lineItem.variant_data.grind,
              },
            });
            
            finalPriceId = price.id;
            console.log(`Created new Stripe price ${finalPriceId} for variant ${lineItem.variant_data.variant_id}`);
          } catch (priceError) {
            console.error('Error creating Stripe price:', priceError);
            return corsResponse({ error: 'Failed to create price for one of the items' }, 500);
          }
        }

        if (!finalPriceId) {
          return corsResponse({ error: 'No price ID available for one of the items' }, 400);
        }

        checkoutLineItems.push({
          price: finalPriceId,
          quantity: lineItem.quantity || 1,
        });
      }
    } else {
      // Handle single item (backward compatibility)
      let finalPriceId = price_id;
      
      if (!finalPriceId && variant_data) {
        try {
          const price = await stripe.prices.create({
            unit_amount: Math.round(variant_data.price * 100), // Convert to cents
            currency: 'usd',
            product_data: {
              name: `${variant_data.product_name} - ${variant_data.size} ${variant_data.grind === 'whole-bean' ? 'Whole Bean' : variant_data.grind}`,
              metadata: {
                variant_id: variant_data.variant_id,
                size: variant_data.size,
                grind: variant_data.grind,
              },
            },
            metadata: {
              variant_id: variant_data.variant_id,
              size: variant_data.size,
              grind: variant_data.grind,
            },
          });
          
          finalPriceId = price.id;
          console.log(`Created new Stripe price ${finalPriceId} for variant ${variant_data.variant_id}`);
        } catch (priceError) {
          console.error('Error creating Stripe price:', priceError);
          return corsResponse({ error: 'Failed to create price' }, 500);
        }
      }

      if (!finalPriceId) {
        return corsResponse({ error: 'No price ID available' }, 400);
      }

      checkoutLineItems.push({
        price: finalPriceId,
        quantity: 1,
      });
    }

    // Create Checkout Session
    const sessionData: any = {
      customer: customerId,
      payment_method_types: ['card'],
      line_items: checkoutLineItems,
      mode: mode || 'payment',
      success_url,
      cancel_url,
    };

    // Add metadata if variant_data is provided (for single item)
    if (variant_data) {
      sessionData.metadata = {
        variant_id: variant_data.variant_id,
        product_name: variant_data.product_name,
        size: variant_data.size,
        grind: variant_data.grind,
      };
    } else if (line_items && line_items.length > 0) {
      // For multiple items, add summary metadata
      sessionData.metadata = {
        total_items: line_items.length.toString(),
        item_summary: line_items.map(item => 
          `${item.quantity}x ${item.variant_data?.product_name || 'Coffee'} (${item.variant_data?.size || '12oz'} ${item.variant_data?.grind || 'whole-bean'})`
        ).join(', ').substring(0, 500), // Stripe metadata has a 500 char limit
      };
    }

    const session = await stripe.checkout.sessions.create(sessionData);

    console.log(`Created checkout session ${session.id} for customer ${customerId} with ${checkoutLineItems.length} line items`);

    return corsResponse({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error(`Checkout error: ${error.message}`);
    return corsResponse({ error: error.message }, 500);
  }
});