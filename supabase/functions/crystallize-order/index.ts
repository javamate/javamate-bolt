import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

const CRYSTALLIZE_TENANT_ID = Deno.env.get('CRYSTALLIZE_TENANT_ID');
const CRYSTALLIZE_ACCESS_TOKEN_ID = Deno.env.get('CRYSTALLIZE_ACCESS_TOKEN_ID');
const CRYSTALLIZE_ACCESS_TOKEN_SECRET = Deno.env.get('CRYSTALLIZE_ACCESS_TOKEN_SECRET');

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
    // Validate tenant ID format
    if (!CRYSTALLIZE_TENANT_ID || CRYSTALLIZE_TENANT_ID.length < 3) {
      throw new Error('Invalid Crystallize tenant ID');
    }

    // Construct the correct API URL - try both PIM and Catalogue API endpoints
    const pimApiUrl = `https://pim.crystallize.com/graphql/${CRYSTALLIZE_TENANT_ID}`;
    const catalogueApiUrl = `https://api.crystallize.com/${CRYSTALLIZE_TENANT_ID}/catalogue`;
    
    // For order creation, we should use the PIM API
    const apiUrl = pimApiUrl;

    console.log('Using Crystallize API URL:', apiUrl);

    // Prepare line items for Crystallize
    const crystallizeLineItems = orderData.lineItems.map(item => ({
      name: `${item.productName} - ${item.size} ${item.grind === 'whole-bean' ? 'Whole Bean' : item.grind}`,
      sku: `${item.variantId}`,
      quantity: item.quantity,
      price: {
        gross: item.unitPrice,
        net: item.unitPrice,
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
    const customerName = orderData.customerName || 'Customer';
    const nameParts = customerName.split(' ');
    const customer = {
      identifier: orderData.customerId,
      firstName: nameParts[0] || 'Customer',
      lastName: nameParts.slice(1).join(' ') || '',
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

    // Prepare authentication - try multiple authentication methods
    const authHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'User-Agent': 'Javamate-Coffee-Integration/1.0',
    };

    // Method 1: Bearer token
    const bearerToken = `${CRYSTALLIZE_ACCESS_TOKEN_ID}:${CRYSTALLIZE_ACCESS_TOKEN_SECRET}`;
    authHeaders['Authorization'] = `Bearer ${bearerToken}`;

    // Method 2: Custom headers (fallback)
    authHeaders['X-Crystallize-Access-Token-ID'] = CRYSTALLIZE_ACCESS_TOKEN_ID;
    authHeaders['X-Crystallize-Access-Token-Secret'] = CRYSTALLIZE_ACCESS_TOKEN_SECRET;

    const requestBody = {
      query: createOrderMutation,
      variables: {
        input: orderInput
      }
    };

    console.log('Sending order to Crystallize:', {
      url: apiUrl,
      customer: customer.email,
      total: orderData.total,
      lineItems: crystallizeLineItems.length,
      tenantId: CRYSTALLIZE_TENANT_ID
    });

    // Send request to Crystallize with improved error handling
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(requestBody)
    });

    console.log('Crystallize API response status:', response.status);
    console.log('Crystallize API response headers:', Object.fromEntries(response.headers.entries()));

    // Get response text first to handle both JSON and HTML responses
    const responseText = await response.text();
    console.log('Crystallize API raw response (first 500 chars):', responseText.substring(0, 500));

    if (!response.ok) {
      // Check if response is HTML (error page)
      if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
        console.error('Crystallize API returned HTML error page instead of JSON');
        
        // Extract error information from HTML if possible
        const titleMatch = responseText.match(/<title>(.*?)<\/title>/i);
        const errorTitle = titleMatch ? titleMatch[1] : 'Unknown error';
        
        throw new Error(`Crystallize API error (${response.status}): ${errorTitle}. This usually indicates an authentication or endpoint issue.`);
      }
      
      // Try to parse as JSON error
      try {
        const errorData = JSON.parse(responseText);
        throw new Error(`Crystallize API error (${response.status}): ${JSON.stringify(errorData)}`);
      } catch (parseError) {
        throw new Error(`Crystallize API error (${response.status}): ${responseText}`);
      }
    }

    // Parse JSON response
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse Crystallize response as JSON:', parseError);
      console.error('Response text:', responseText);
      throw new Error('Crystallize API returned invalid JSON response');
    }

    if (result.errors) {
      console.error('Crystallize GraphQL errors:', result.errors);
      throw new Error(`Crystallize GraphQL errors: ${JSON.stringify(result.errors)}`);
    }

    if (!result.data?.order?.create?.id) {
      console.error('Unexpected Crystallize response structure:', result);
      throw new Error('Unexpected response structure from Crystallize - order creation may have failed');
    }

    const crystallizeOrderId = result.data.order.create.id;
    console.log(`Successfully created Crystallize order ${crystallizeOrderId}`);

    return crystallizeOrderId;

  } catch (error) {
    console.error('Error creating Crystallize order:', error);
    
    // Provide more specific error messages based on common issues
    if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
      console.error('Authentication failed with Crystallize. Please check your access token credentials.');
      throw new Error('Crystallize authentication failed. Please verify your access token credentials.');
    }
    
    if (error.message?.includes('403') || error.message?.includes('Forbidden')) {
      console.error('Permission denied by Crystallize. Please ensure your access token has the necessary permissions.');
      throw new Error('Crystallize permission denied. Please ensure your access token has order creation permissions.');
    }
    
    if (error.message?.includes('404') || error.message?.includes('Not Found')) {
      console.error('Crystallize API endpoint not found. Please check your tenant ID.');
      throw new Error('Crystallize API endpoint not found. Please verify your tenant ID is correct.');
    }
    
    if (error.message?.includes('<!DOCTYPE')) {
      throw new Error('Crystallize API returned an HTML error page instead of JSON. This usually indicates an authentication or configuration issue.');
    }
    
    // Re-throw the original error if it's already descriptive
    throw error;
  }
}