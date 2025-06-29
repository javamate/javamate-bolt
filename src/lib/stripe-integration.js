import Stripe from 'stripe';
import { updateVariantStripePriceId } from './crystallize.js';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY || 'sk_test_demo');

/**
 * Create or retrieve a Stripe price for a product variant
 * @param {Object} variant - Product variant object
 * @param {string} productName - Name of the product
 * @returns {Promise<string>} - Stripe price ID
 */
export async function getOrCreateStripePrice(variant, productName) {
  try {
    // If variant already has a Stripe price ID, return it
    if (variant.stripe_price_id) {
      return variant.stripe_price_id;
    }

    // Create a new Stripe price
    const price = await stripe.prices.create({
      unit_amount: Math.round(variant.price * 100), // Convert to cents
      currency: 'usd',
      product_data: {
        name: `${productName} - ${variant.size} ${variant.grind === 'whole-bean' ? 'Whole Bean' : variant.grind}`,
        metadata: {
          variant_id: variant.id,
          size: variant.size,
          grind: variant.grind,
        },
      },
      metadata: {
        variant_id: variant.id,
        size: variant.size,
        grind: variant.grind,
      },
    });

    // Update the variant in Crystallize with the new price ID
    await updateVariantStripePriceId(variant.product_id, variant.id, price.id);

    return price.id;
  } catch (error) {
    console.error('Error creating Stripe price:', error);
    
    // Return a fallback price ID for demo purposes
    return 'price_1RKgo2R1hBQXgqR7RYvtL02O';
  }
}

/**
 * Create a Stripe checkout session for a product variant
 * @param {Object} variant - Product variant object
 * @param {string} productName - Name of the product
 * @param {number} quantity - Quantity to purchase
 * @param {string} successUrl - Success redirect URL
 * @param {string} cancelUrl - Cancel redirect URL
 * @returns {Promise<Object>} - Stripe checkout session
 */
export async function createCheckoutSession(variant, productName, quantity = 1, successUrl, cancelUrl) {
  try {
    const priceId = await getOrCreateStripePrice(variant, productName);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        variant_id: variant.id,
        product_name: productName,
        size: variant.size,
        grind: variant.grind,
      },
    });

    return session;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

/**
 * Get all Stripe prices for a product's variants
 * @param {Array} variants - Array of product variants
 * @param {string} productName - Name of the product
 * @returns {Promise<Object>} - Map of variant IDs to price IDs
 */
export async function getVariantPrices(variants, productName) {
  const priceMap = {};

  for (const variant of variants) {
    try {
      priceMap[variant.id] = await getOrCreateStripePrice(variant, productName);
    } catch (error) {
      console.error(`Error getting price for variant ${variant.id}:`, error);
      priceMap[variant.id] = 'price_1RKgo2R1hBQXgqR7RYvtL02O'; // Fallback
    }
  }

  return priceMap;
}