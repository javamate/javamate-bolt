export interface StripeProduct {
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
}

export const stripeProducts: StripeProduct[] = [
  {
    priceId: 'price_1RKgo2R1hBQXgqR7RYvtL02O',
    name: 'Organic Peru SWP Decaf',
    description: 'Premium organic decaffeinated coffee from Peru, processed using the Swiss Water Process for a clean, chemical-free decaf experience.',
    mode: 'payment',
  },
];

export function getProductByPriceId(priceId: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.priceId === priceId);
}

export function getProductByName(name: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.name === name);
}