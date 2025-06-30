import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'Bolt Integration',
    version: '1.0.0',
  },
});

const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

Deno.serve(async (req) => {
  try {
    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204 });
    }

    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // get the signature from the header
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return new Response('No signature found', { status: 400 });
    }

    // get the raw body
    const body = await req.text();

    // verify the webhook signature
    let event: Stripe.Event;

    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, stripeWebhookSecret);
    } catch (error: any) {
      console.error(`Webhook signature verification failed: ${error.message}`);
      return new Response(`Webhook signature verification failed: ${error.message}`, { status: 400 });
    }

    EdgeRuntime.waitUntil(handleEvent(event));

    return Response.json({ received: true });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

async function handleEvent(event: Stripe.Event) {
  const stripeData = event?.data?.object ?? {};

  if (!stripeData) {
    return;
  }

  if (!('customer' in stripeData)) {
    return;
  }

  // for one time payments, we only listen for the checkout.session.completed event
  if (event.type === 'payment_intent.succeeded' && event.data.object.invoice === null) {
    return;
  }

  const { customer: customerId } = stripeData;

  if (!customerId || typeof customerId !== 'string') {
    console.error(`No customer received on event: ${JSON.stringify(event)}`);
  } else {
    let isSubscription = true;

    if (event.type === 'checkout.session.completed') {
      const { mode } = stripeData as Stripe.Checkout.Session;

      isSubscription = mode === 'subscription';

      console.info(`Processing ${isSubscription ? 'subscription' : 'one-time payment'} checkout session`);
    }

    const { mode, payment_status } = stripeData as Stripe.Checkout.Session;

    if (isSubscription) {
      console.info(`Starting subscription sync for customer: ${customerId}`);
      await syncCustomerFromStripe(customerId);
    } else if (mode === 'payment' && payment_status === 'paid') {
      try {
        // Extract the necessary information from the session
        const {
          id: checkout_session_id,
          payment_intent,
          amount_subtotal,
          amount_total,
          currency,
          customer_details,
          shipping_details,
          metadata,
        } = stripeData as Stripe.Checkout.Session;

        // Insert the order into the stripe_orders table
        const { error: orderError } = await supabase.from('stripe_orders').insert({
          checkout_session_id,
          payment_intent_id: payment_intent,
          customer_id: customerId,
          amount_subtotal,
          amount_total,
          currency,
          payment_status,
          status: 'completed', // assuming we want to mark it as completed since payment is successful
        });

        if (orderError) {
          console.error('Error inserting order:', orderError);
          return;
        }
        
        console.info(`Successfully processed one-time payment for session: ${checkout_session_id}`);

        // Send order to Crystallize
        await sendOrderToCrystallize({
          checkout_session_id,
          payment_intent_id: payment_intent as string,
          customer_id: customerId,
          amount_subtotal: amount_subtotal || 0,
          amount_total: amount_total || 0,
          currency: currency || 'usd',
          customer_details,
          shipping_details,
          metadata: metadata || {},
        });

      } catch (error) {
        console.error('Error processing one-time payment:', error);
      }
    }
  }
}

async function sendOrderToCrystallize(orderInfo: {
  checkout_session_id: string;
  payment_intent_id: string;
  customer_id: string;
  amount_subtotal: number;
  amount_total: number;
  currency: string;
  customer_details?: Stripe.Checkout.Session.CustomerDetails | null;
  shipping_details?: Stripe.Checkout.Session.ShippingDetails | null;
  metadata: Record<string, string>;
}) {
  try {
    console.log(`Sending order to Crystallize for session: ${orderInfo.checkout_session_id}`);

    // Get the full checkout session with line items
    const session = await stripe.checkout.sessions.retrieve(orderInfo.checkout_session_id, {
      expand: ['line_items', 'line_items.data.price.product']
    });

    // Extract line items information
    const lineItems = session.line_items?.data.map(item => {
      const price = item.price;
      const product = price?.product as Stripe.Product;
      
      // Extract variant information from metadata
      const variantId = price?.metadata?.variant_id || product?.metadata?.variant_id || `variant-${Date.now()}`;
      const size = price?.metadata?.size || product?.metadata?.size || '12oz';
      const grind = price?.metadata?.grind || product?.metadata?.grind || 'whole-bean';
      
      return {
        variantId,
        productName: product?.name || 'Coffee',
        size,
        grind,
        quantity: item.quantity || 1,
        unitPrice: (price?.unit_amount || 0) / 100, // Convert from cents
        totalPrice: ((price?.unit_amount || 0) * (item.quantity || 1)) / 100,
      };
    }) || [];

    // Calculate shipping cost (difference between total and subtotal, minus tax)
    const shippingCost = (orderInfo.amount_total - orderInfo.amount_subtotal) / 100;
    const taxAmount = 0; // We're not collecting tax currently

    // Prepare order data for Crystallize
    const crystallizeOrderData = {
      orderId: orderInfo.checkout_session_id,
      customerId: orderInfo.customer_id,
      customerEmail: orderInfo.customer_details?.email || 'unknown@example.com',
      customerName: orderInfo.customer_details?.name || undefined,
      customerPhone: orderInfo.customer_details?.phone || undefined,
      shippingAddress: orderInfo.shipping_details?.address ? {
        line1: orderInfo.shipping_details.address.line1 || '',
        line2: orderInfo.shipping_details.address.line2 || undefined,
        city: orderInfo.shipping_details.address.city || '',
        state: orderInfo.shipping_details.address.state || '',
        postal_code: orderInfo.shipping_details.address.postal_code || '',
        country: orderInfo.shipping_details.address.country || 'US',
      } : undefined,
      lineItems,
      subtotal: orderInfo.amount_subtotal / 100,
      shipping: shippingCost,
      tax: taxAmount,
      total: orderInfo.amount_total / 100,
      currency: orderInfo.currency,
      paymentIntentId: orderInfo.payment_intent_id,
      checkoutSessionId: orderInfo.checkout_session_id,
      orderDate: new Date().toISOString(),
    };

    // Call the Crystallize order function
    const crystallizeResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/crystallize-order`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(crystallizeOrderData),
    });

    if (!crystallizeResponse.ok) {
      const errorText = await crystallizeResponse.text();
      console.error('Failed to send order to Crystallize:', crystallizeResponse.status, errorText);
      return;
    }

    const result = await crystallizeResponse.json();
    console.log(`Successfully sent order to Crystallize:`, result);

  } catch (error) {
    console.error('Error sending order to Crystallize:', error);
    // Don't throw the error - we don't want to fail the webhook processing
    // if Crystallize integration fails
  }
}

// based on the excellent https://github.com/t3dotgg/stripe-recommendations
async function syncCustomerFromStripe(customerId: string) {
  try {
    // fetch latest subscription data from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
      status: 'all',
      expand: ['data.default_payment_method'],
    });

    // TODO verify if needed
    if (subscriptions.data.length === 0) {
      console.info(`No active subscriptions found for customer: ${customerId}`);
      const { error: noSubError } = await supabase.from('stripe_subscriptions').upsert(
        {
          customer_id: customerId,
          subscription_status: 'not_started',
        },
        {
          onConflict: 'customer_id',
        },
      );

      if (noSubError) {
        console.error('Error updating subscription status:', noSubError);
        throw new Error('Failed to update subscription status in database');
      }
    }

    // assumes that a customer can only have a single subscription
    const subscription = subscriptions.data[0];

    // store subscription state
    const { error: subError } = await supabase.from('stripe_subscriptions').upsert(
      {
        customer_id: customerId,
        subscription_id: subscription.id,
        price_id: subscription.items.data[0].price.id,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        cancel_at_period_end: subscription.cancel_at_period_end,
        ...(subscription.default_payment_method && typeof subscription.default_payment_method !== 'string'
          ? {
              payment_method_brand: subscription.default_payment_method.card?.brand ?? null,
              payment_method_last4: subscription.default_payment_method.card?.last4 ?? null,
            }
          : {}),
        status: subscription.status,
      },
      {
        onConflict: 'customer_id',
      },
    );

    if (subError) {
      console.error('Error syncing subscription:', subError);
      throw new Error('Failed to sync subscription in database');
    }
    console.info(`Successfully synced subscription for customer: ${customerId}`);
  } catch (error) {
    console.error(`Failed to sync subscription for customer ${customerId}:`, error);
    throw error;
  }
}