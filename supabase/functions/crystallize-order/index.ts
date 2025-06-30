import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

const CRYSTALLIZE_TENANT_ID = Deno.env.get('CRYSTALLIZE_TENANT_ID');
const CRYSTALLIZE_ACCESS_TOKEN_ID = Deno.env.get('CRYSTALLIZE_ACCESS_TOKEN_ID');
const CRYSTALLIZE_ACCESS_TOKEN_SECRET = Deno.env.get('CRYSTALLIZE_ACCESS_TOKEN_SECRET');
const CRYSTALLIZE_API_URL = `https://pim.crystallize.com/graphql/${CRYSTALLIZE_TENANT_ID}`;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CrystallizeOrderData {
  orderId: string;
  customerId: string;
  customerEmail: string;
  customerName?: string;
  customerPhone?: string;
  shippingAddress?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  lineItems: Array<{
    variantId: string;
    productName: string;
    size: string;
    grind: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
  paymentIntentId: string;
  checkoutSessionId: string;
  orderDate: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (!CRYSTALLIZE_TENANT_ID || !CRYSTALLIZE_ACCESS_TOKEN_ID || !CRYSTALLIZE_ACCESS_TOKEN_SECRET) {
      console.error('Crystallize credentials not configured');
      return new Response(
        JSON.stringify({ error: 'Crystallize integration not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const orderData: CrystallizeOrderData = await req.json();

    // Validate required fields
    if (!orderData.orderId || !orderData.customerId || !orderData.customerEmail) {
      return new Response(
        JSON.stringify({ error: 'Missing required order data' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log(`Processing order ${orderData.orderId} for Crystallize integration`);

    // Create Crystallize order
    const crystallizeOrderId = await createCrystallizeOrder(orderData);

    if (!crystallizeOrderId) {
      throw new Error('Failed to create order in Crystallize');
    }

    console.log(`Successfully created Crystallize order ${crystallizeOrderId} for order ${orderData.orderId}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        crystallizeOrderId,
        message: 'Order successfully sent to Crystallize'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in crystallize-order function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message || 'An unexpected error occurred while processing the order'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

async function createCrystallizeOrder(orderData: CrystallizeOrderData): Promise<string | null> {
  try {
    // Prepare line items for Crystallize
    const crystallizeLineItems = orderData.lineItems.map(item => ({
      name: `${item.productName} - ${item.size} ${item.grind === 'whole-bean' ? 'Whole Bean' : item.grind}`,
      sku: `${item.variantId}`,
      quantity: item.quantity,
      price: {
        gross: item.unitPrice,
        net: item.unitPrice, // Assuming no tax for now
        currency: orderData.currency.toUpperCase(),
        tax: {
          name: 'No Tax',
          percent: 0
        }
      },
      productVariant: {
        id: item.variantId,
        name: item.productName,
        attributes: [
          {
            attribute: 'size',
            value: item.size
          },
          {
            attribute: 'grind',
            value: item.grind
          }
        ]
      }
    }));

    // Prepare customer information
    const customer = {
      identifier: orderData.customerId,
      firstName: orderData.customerName?.split(' ')[0] || 'Customer',
      lastName: orderData.customerName?.split(' ').slice(1).join(' ') || '',
      email: orderData.customerEmail,
      phone: orderData.customerPhone || '',
      addresses: orderData.shippingAddress ? [{
        type: 'delivery',
        street: orderData.shippingAddress.line1,
        street2: orderData.shippingAddress.line2 || '',
        city: orderData.shippingAddress.city,
        state: orderData.shippingAddress.state,
        postalCode: orderData.shippingAddress.postal_code,
        country: orderData.shippingAddress.country
      }] : []
    };

    // Create the order mutation for Crystallize
    const createOrderMutation = `
      mutation CreateOrder($input: CreateOrderInput!) {
        order {
          create(input: $input) {
            id
            createdAt
            updatedAt
            total {
              gross
              net
              currency
            }
            customer {
              identifier
              email
            }
            cart {
              name
              sku
              quantity
              price {
                gross
                net
                currency
              }
            }
          }
        }
      }
    `;

    const orderInput = {
      customer: customer,
      cart: crystallizeLineItems,
      total: {
        gross: orderData.total,
        net: orderData.subtotal,
        currency: orderData.currency.toUpperCase(),
        tax: {
          name: 'Sales Tax',
          percent: orderData.tax > 0 ? ((orderData.tax / orderData.subtotal) * 100) : 0
        }
      },
      payment: [{
        provider: 'stripe',
        stripe: {
          paymentIntentId: orderData.paymentIntentId,
          paymentMethod: 'card'
        }
      }],
      meta: [
        {
          key: 'stripe_payment_intent_id',
          value: orderData.paymentIntentId
        },
        {
          key: 'stripe_checkout_session_id',
          value: orderData.checkoutSessionId
        },
        {
          key: 'original_order_id',
          value: orderData.orderId
        },
        {
          key: 'order_source',
          value: 'javamate_website'
        },
        {
          key: 'shipping_cost',
          value: orderData.shipping.toString()
        }
      ]
    };

    // Create authentication header
    const authHeader = `Bearer ${CRYSTALLIZE_ACCESS_TOKEN_ID}:${CRYSTALLIZE_ACCESS_TOKEN_SECRET}`;

    console.log('Sending order to Crystallize:', {
      url: CRYSTALLIZE_API_URL,
      customer: customer.email,
      total: orderData.total,
      lineItems: crystallizeLineItems.length
    });

    // Send request to Crystallize
    const response = await fetch(CRYSTALLIZE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
        'X-Crystallize-Access-Token-ID': CRYSTALLIZE_ACCESS_TOKEN_ID,
        'X-Crystallize-Access-Token-Secret': CRYSTALLIZE_ACCESS_TOKEN_SECRET
      },
      body: JSON.stringify({
        query: createOrderMutation,
        variables: {
          input: orderInput
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Crystallize API error:', response.status, errorText);
      throw new Error(`Crystallize API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error('Crystallize GraphQL errors:', result.errors);
      throw new Error(`Crystallize GraphQL errors: ${JSON.stringify(result.errors)}`);
    }

    if (!result.data?.order?.create?.id) {
      console.error('Unexpected Crystallize response structure:', result);
      throw new Error('Unexpected response structure from Crystallize');
    }

    const crystallizeOrderId = result.data.order.create.id;
    console.log(`Successfully created Crystallize order ${crystallizeOrderId}`);

    return crystallizeOrderId;

  } catch (error) {
    console.error('Error creating Crystallize order:', error);
    
    // Check for specific error types
    if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
      console.error('Authentication failed with Crystallize. Please check your access token credentials.');
    }
    
    if (error.message?.includes('403') || error.message?.includes('Forbidden')) {
      console.error('Permission denied by Crystallize. Please ensure your access token has the necessary permissions.');
    }
    
    throw error;
  }
}