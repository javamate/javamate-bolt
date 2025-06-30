import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';
import { createClient as createCrystallizeClient } from 'npm:@crystallize/js-api-client@4.3.0';

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

// Initialize Crystallize clients
let catalogueClient: any = null;
let pimClient: any = null;

function initializeCrystallizeClients() {
  if (!CRYSTALLIZE_TENANT_ID || !CRYSTALLIZE_ACCESS_TOKEN_ID || !CRYSTALLIZE_ACCESS_TOKEN_SECRET) {
    throw new Error('Crystallize credentials not configured');
  }

  try {
    // Catalogue API client (for reading data)
    catalogueClient = createCrystallizeClient({
      tenantIdentifier: CRYSTALLIZE_TENANT_ID,
      accessTokenId: CRYSTALLIZE_ACCESS_TOKEN_ID,
      accessTokenSecret: CRYSTALLIZE_ACCESS_TOKEN_SECRET,
    });

    // PIM API client (for creating orders)
    pimClient = createCrystallizeClient({
      tenantIdentifier: CRYSTALLIZE_TENANT_ID,
      accessTokenId: CRYSTALLIZE_ACCESS_TOKEN_ID,
      accessTokenSecret: CRYSTALLIZE_ACCESS_TOKEN_SECRET,
      origin: 'https://pim.crystallize.com',
    });

    console.log(`Initialized Crystallize clients for tenant: ${CRYSTALLIZE_TENANT_ID}`);
  } catch (error) {
    console.error('Failed to initialize Crystallize clients:', error);
    throw new Error(`Failed to initialize Crystallize clients: ${error.message}`);
  }
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

    // Initialize Crystallize clients
    initializeCrystallizeClients();

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
    console.log('Creating Crystallize order with JS API client');

    // Prepare customer information
    const customerName = orderData.customerName || 'Customer';
    const nameParts = customerName.split(' ');
    
    const customer = {
      identifier: orderData.customerId,
      firstName: nameParts[0] || 'Customer',
      lastName: nameParts.slice(1).join(' ') || '',
      email: orderData.customerEmail,
      phone: orderData.customerPhone || '',
    };

    // Prepare addresses if shipping address is provided
    const addresses = orderData.shippingAddress ? [{
      type: 'delivery',
      street: orderData.shippingAddress.line1,
      street2: orderData.shippingAddress.line2 || '',
      city: orderData.shippingAddress.city,
      state: orderData.shippingAddress.state,
      postalCode: orderData.shippingAddress.postal_code,
      country: orderData.shippingAddress.country,
    }] : [];

    // Prepare line items for Crystallize
    const cart = orderData.lineItems.map(item => ({
      name: `${item.productName} - ${item.size} ${item.grind === 'whole-bean' ? 'Whole Bean' : item.grind}`,
      sku: item.variantId,
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

    // Calculate tax percentage
    const taxPercent = orderData.tax > 0 && orderData.subtotal > 0 
      ? ((orderData.tax / orderData.subtotal) * 100) 
      : 0;

    // Prepare the order input
    const orderInput = {
      customer: {
        ...customer,
        addresses: addresses
      },
      cart: cart,
      total: {
        gross: orderData.total,
        net: orderData.subtotal,
        currency: orderData.currency.toUpperCase(),
        tax: {
          name: 'Sales Tax',
          percent: taxPercent
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
        },
        {
          key: 'order_date',
          value: orderData.orderDate
        }
      ]
    };

    // Create the order mutation
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
              firstName
              lastName
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
            meta {
              key
              value
            }
          }
        }
      }
    `;

    console.log('Sending order to Crystallize PIM API:', {
      customer: customer.email,
      total: orderData.total,
      lineItems: cart.length,
      tenantId: CRYSTALLIZE_TENANT_ID
    });

    // Use the PIM API client to create the order
    const response = await pimClient.pimApi(createOrderMutation, {
      input: orderInput
    });

    console.log('Crystallize PIM API response received');

    // Check for GraphQL errors
    if (response.errors && response.errors.length > 0) {
      console.error('Crystallize GraphQL errors:', response.errors);
      
      // Extract meaningful error messages
      const errorMessages = response.errors.map((error: any) => error.message).join(', ');
      throw new Error(`Crystallize GraphQL errors: ${errorMessages}`);
    }

    // Check for successful order creation
    if (!response.data?.order?.create?.id) {
      console.error('Unexpected Crystallize response structure:', response);
      throw new Error('Order creation failed - no order ID returned from Crystallize');
    }

    const crystallizeOrderId = response.data.order.create.id;
    const createdOrder = response.data.order.create;

    console.log(`Successfully created Crystallize order:`, {
      id: crystallizeOrderId,
      customer: createdOrder.customer?.email,
      total: createdOrder.total?.gross,
      currency: createdOrder.total?.currency,
      cartItems: createdOrder.cart?.length || 0
    });

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

    if (error.message?.includes('ENOTFOUND') || error.message?.includes('network')) {
      console.error('Network error connecting to Crystallize API.');
      throw new Error('Network error connecting to Crystallize. Please check your internet connection and try again.');
    }

    if (error.message?.includes('timeout')) {
      console.error('Timeout connecting to Crystallize API.');
      throw new Error('Timeout connecting to Crystallize. The service may be temporarily unavailable.');
    }

    // Check for validation errors
    if (error.message?.includes('validation') || error.message?.includes('invalid')) {
      console.error('Validation error from Crystallize:', error.message);
      throw new Error(`Crystallize validation error: ${error.message}`);
    }

    // Check for tenant-related errors
    if (error.message?.includes('tenant') || error.message?.includes('Tenant')) {
      console.error('Tenant-related error from Crystallize:', error.message);
      throw new Error(`Crystallize tenant error: Please verify your tenant ID (${CRYSTALLIZE_TENANT_ID}) is correct.`);
    }

    // Re-throw the original error if it's already descriptive
    throw new Error(`Failed to create Crystallize order: ${error.message}`);
  }
}

async function validateCrystallizeConnection(): Promise<boolean> {
  try {
    if (!catalogueClient) {
      throw new Error('Catalogue client not initialized');
    }

    // Simple query to test the connection
    const testQuery = `
      query TestConnection {
        tenant {
          identifier
          name
        }
      }
    `;

    const response = await catalogueClient.catalogueApi(testQuery);
    
    if (response.errors) {
      console.error('Crystallize connection test failed:', response.errors);
      return false;
    }

    if (response.data?.tenant?.identifier) {
      console.log(`Crystallize connection validated for tenant: ${response.data.tenant.identifier}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error validating Crystallize connection:', error);
    return false;
  }
}

// Helper function to get product information from Crystallize (if needed)
async function getCrystallizeProduct(productId: string): Promise<any> {
  try {
    if (!catalogueClient) {
      throw new Error('Catalogue client not initialized');
    }

    const productQuery = `
      query GetProduct($id: ID!, $language: String!) {
        catalogue(id: $id, language: $language) {
          id
          name
          path
          type
          ... on Product {
            defaultVariant {
              id
              name
              sku
              price
              attributes {
                attribute
                value
              }
            }
            variants {
              id
              name
              sku
              price
              attributes {
                attribute
                value
              }
            }
          }
        }
      }
    `;

    const response = await catalogueClient.catalogueApi(productQuery, {
      id: productId,
      language: 'en'
    });

    if (response.errors) {
      console.error('Error fetching product from Crystallize:', response.errors);
      return null;
    }

    return response.data?.catalogue || null;
  } catch (error) {
    console.error('Error getting Crystallize product:', error);
    return null;
  }
}