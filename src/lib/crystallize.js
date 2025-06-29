import { createClient } from '@crystallize/js-api-client';

// Initialize Crystallize client
const client = createClient({
  tenantIdentifier: import.meta.env.CRYSTALLIZE_TENANT_ID || 'demo-tenant',
  accessTokenId: import.meta.env.CRYSTALLIZE_ACCESS_TOKEN_ID || 'demo-token-id',
  accessTokenSecret: import.meta.env.CRYSTALLIZE_ACCESS_TOKEN_SECRET || 'demo-token-secret',
});

/**
 * Fetch products from Crystallize
 * @param {Object} options - Query options
 * @returns {Promise<Array>} - Array of products
 */
export async function getCrystallizeProducts(options = {}) {
  try {
    // Use demo data if in development without Crystallize credentials
    if (import.meta.env.DEV && !import.meta.env.CRYSTALLIZE_TENANT_ID) {
      return getDemoProducts();
    }

    const query = `
      query GetProducts($first: Int, $language: String!) {
        catalogue(path: "/", language: $language) {
          children(first: $first) {
            edges {
              node {
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
                    priceVariants {
                      identifier
                      price
                      currency
                    }
                    images {
                      url
                      altText
                      variants {
                        url
                        width
                        height
                      }
                    }
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
                    priceVariants {
                      identifier
                      price
                      currency
                    }
                    attributes {
                      attribute
                      value
                    }
                    subscriptionPlans {
                      identifier
                      name
                      periods {
                        id
                        name
                        initial {
                          priceVariants {
                            identifier
                            price
                            currency
                          }
                        }
                        recurring {
                          priceVariants {
                            identifier
                            price
                            currency
                          }
                        }
                      }
                    }
                    externalReference
                  }
                  topics {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
    `;

    const variables = {
      first: options.limit || 50,
      language: options.language || 'en',
    };

    const response = await client.catalogueApi(query, variables);
    
    if (!response.data?.catalogue?.children?.edges) {
      console.warn('No products found in Crystallize response');
      return getDemoProducts();
    }

    return response.data.catalogue.children.edges
      .map(edge => edge.node)
      .filter(node => node.type === 'product')
      .map(transformCrystallizeProduct);

  } catch (error) {
    console.error('Error fetching Crystallize products:', error);
    return getDemoProducts();
  }
}

/**
 * Fetch a single product from Crystallize by path
 * @param {string} path - The product path/slug
 * @returns {Promise<Object>} - The product
 */
export async function getCrystallizeProduct(path) {
  try {
    // Use demo data if in development without Crystallize credentials
    if (import.meta.env.DEV && !import.meta.env.CRYSTALLIZE_TENANT_ID) {
      const demoProducts = getDemoProducts();
      return demoProducts.find(product => product.fields.slug === path) || null;
    }

    const query = `
      query GetProduct($path: String!, $language: String!) {
        catalogue(path: $path, language: $language) {
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
              priceVariants {
                identifier
                price
                currency
              }
              images {
                url
                altText
                variants {
                  url
                  width
                  height
                }
              }
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
              priceVariants {
                identifier
                price
                currency
              }
              attributes {
                attribute
                value
              }
              subscriptionPlans {
                identifier
                name
                periods {
                  id
                  name
                  initial {
                    priceVariants {
                      identifier
                      price
                      currency
                    }
                  }
                  recurring {
                    priceVariants {
                      identifier
                      price
                      currency
                    }
                  }
                }
              }
              externalReference
            }
            topics {
              id
              name
            }
          }
        }
      }
    `;

    const variables = {
      path: path.startsWith('/') ? path : `/${path}`,
      language: 'en',
    };

    const response = await client.catalogueApi(query, variables);
    
    if (!response.data?.catalogue) {
      return null;
    }

    return transformCrystallizeProduct(response.data.catalogue);

  } catch (error) {
    console.error('Error fetching Crystallize product:', error);
    const demoProducts = getDemoProducts();
    return demoProducts.find(product => product.fields.slug === path) || null;
  }
}

/**
 * Transform Crystallize product to match our expected format
 * @param {Object} crystallizeProduct - Raw Crystallize product
 * @returns {Object} - Transformed product
 */
function transformCrystallizeProduct(crystallizeProduct) {
  const defaultVariant = crystallizeProduct.defaultVariant;
  const variants = crystallizeProduct.variants || [];
  
  // Get attributes as key-value pairs
  const attributes = {};
  if (defaultVariant.attributes) {
    defaultVariant.attributes.forEach(attr => {
      attributes[attr.attribute] = attr.value;
    });
  }

  // Transform variants to include size, grind, and pricing info
  const transformedVariants = variants.map(variant => {
    const variantAttributes = {};
    if (variant.attributes) {
      variant.attributes.forEach(attr => {
        variantAttributes[attr.attribute] = attr.value;
      });
    }

    return {
      id: variant.id,
      name: variant.name,
      sku: variant.sku,
      size: variantAttributes.size || '12oz',
      grind: variantAttributes.grind || 'whole-bean',
      price: variant.price || 0,
      priceVariants: variant.priceVariants || [],
      stripe_price_id: variant.externalReference || null,
      subscriptionPlans: variant.subscriptionPlans || [],
    };
  });

  // If no variants exist, create a default one from the defaultVariant
  if (transformedVariants.length === 0 && defaultVariant) {
    transformedVariants.push({
      id: defaultVariant.id,
      name: defaultVariant.name,
      sku: defaultVariant.sku,
      size: attributes.size || '12oz',
      grind: attributes.grind || 'whole-bean',
      price: defaultVariant.price || 0,
      priceVariants: defaultVariant.priceVariants || [],
      stripe_price_id: defaultVariant.externalReference || null,
      subscriptionPlans: [],
    });
  }

  return {
    sys: { id: crystallizeProduct.id },
    fields: {
      title: crystallizeProduct.name,
      slug: crystallizeProduct.path?.replace('/', '') || crystallizeProduct.name.toLowerCase().replace(/\s+/g, '-'),
      price: defaultVariant?.price || 0,
      featured: attributes.featured === 'true' || false,
      isNew: attributes.isNew === 'true' || false,
      shortDescription: attributes.shortDescription || '',
      description: attributes.description || '',
      origin: attributes.origin || '',
      roastLevel: attributes.roastLevel || '',
      featuredImage: defaultVariant?.images?.[0] ? {
        fields: {
          file: {
            url: defaultVariant.images[0].url
          }
        }
      } : null,
      images: defaultVariant?.images?.map(img => ({
        fields: {
          file: {
            url: img.url
          }
        }
      })) || [],
      variants: transformedVariants,
    }
  };
}

/**
 * Create or update a Stripe price ID for a product variant
 * @param {string} productId - Crystallize product ID
 * @param {string} variantId - Crystallize variant ID
 * @param {string} stripePriceId - Stripe price ID to store
 * @returns {Promise<boolean>} - Success status
 */
export async function updateVariantStripePriceId(productId, variantId, stripePriceId) {
  try {
    // In a real implementation, this would use Crystallize's management API
    // to update the variant's externalReference field with the Stripe price ID
    
    if (import.meta.env.DEV && !import.meta.env.CRYSTALLIZE_TENANT_ID) {
      console.log(`Demo mode: Would update variant ${variantId} with Stripe price ID ${stripePriceId}`);
      return true;
    }

    // This would require the Crystallize Management API
    // const updateQuery = `
    //   mutation UpdateVariant($id: ID!, $input: ProductVariantUpdateInput!) {
    //     product {
    //       updateVariant(id: $id, input: $input) {
    //         id
    //         externalReference
    //       }
    //     }
    //   }
    // `;

    // For now, we'll just log this action
    console.log(`Would update Crystallize variant ${variantId} with Stripe price ID ${stripePriceId}`);
    return true;

  } catch (error) {
    console.error('Error updating Crystallize variant:', error);
    return false;
  }
}

/**
 * Generate demo products for development
 * @returns {Array} - Array of demo products with variants
 */
function getDemoProducts() {
  return [
    {
      sys: { id: 'product-1' },
      fields: {
        title: 'Ethiopian Yirgacheffe',
        slug: 'ethiopian-yirgacheffe',
        price: 16.99,
        featured: true,
        isNew: true,
        shortDescription: 'Bright and fruity with notes of bergamot and lemon.',
        description: 'Our Ethiopian Yirgacheffe is sourced from the highlands of Ethiopia, the birthplace of coffee. This light roast highlights the complex, bright flavors with notes of citrus, bergamot, and a floral finish.',
        origin: 'Ethiopia',
        roastLevel: 'Light',
        featuredImage: {
          fields: {
            file: {
              url: 'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg'
            }
          }
        },
        images: [
          { fields: { file: { url: 'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg' } } },
          { fields: { file: { url: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg' } } }
        ],
        variants: [
          {
            id: 'variant-1-1',
            name: 'Ethiopian Yirgacheffe - 12oz Whole Bean',
            sku: 'ETH-YIR-12-WB',
            size: '12oz',
            grind: 'whole-bean',
            price: 16.99,
            stripe_price_id: 'price_1RKgo2R1hBQXgqR7RYvtL02O',
          },
          {
            id: 'variant-1-2',
            name: 'Ethiopian Yirgacheffe - 12oz Ground',
            sku: 'ETH-YIR-12-GR',
            size: '12oz',
            grind: 'medium',
            price: 16.99,
            stripe_price_id: null,
          },
          {
            id: 'variant-1-3',
            name: 'Ethiopian Yirgacheffe - 16oz Whole Bean',
            sku: 'ETH-YIR-16-WB',
            size: '16oz',
            grind: 'whole-bean',
            price: 21.99,
            stripe_price_id: null,
          },
          {
            id: 'variant-1-4',
            name: 'Ethiopian Yirgacheffe - 16oz Ground',
            sku: 'ETH-YIR-16-GR',
            size: '16oz',
            grind: 'medium',
            price: 21.99,
            stripe_price_id: null,
          }
        ]
      }
    },
    {
      sys: { id: 'product-2' },
      fields: {
        title: 'Colombian Supremo',
        slug: 'colombian-supremo',
        price: 15.99,
        featured: true,
        isNew: false,
        shortDescription: 'Sweet and balanced with notes of caramel and chocolate.',
        description: 'Our Colombian Supremo comes from the high-altitude regions of Colombia. This medium roast offers a perfect balance of sweetness with notes of caramel and milk chocolate, with a smooth, clean finish.',
        origin: 'Colombia',
        roastLevel: 'Medium',
        featuredImage: {
          fields: {
            file: {
              url: 'https://images.pexels.com/photos/2299028/pexels-photo-2299028.jpeg'
            }
          }
        },
        images: [
          { fields: { file: { url: 'https://images.pexels.com/photos/2299028/pexels-photo-2299028.jpeg' } } },
          { fields: { file: { url: 'https://images.pexels.com/photos/585753/pexels-photo-585753.jpeg' } } }
        ],
        variants: [
          {
            id: 'variant-2-1',
            name: 'Colombian Supremo - 12oz Whole Bean',
            sku: 'COL-SUP-12-WB',
            size: '12oz',
            grind: 'whole-bean',
            price: 15.99,
            stripe_price_id: null,
          },
          {
            id: 'variant-2-2',
            name: 'Colombian Supremo - 12oz Ground',
            sku: 'COL-SUP-12-GR',
            size: '12oz',
            grind: 'medium',
            price: 15.99,
            stripe_price_id: null,
          },
          {
            id: 'variant-2-3',
            name: 'Colombian Supremo - 16oz Whole Bean',
            sku: 'COL-SUP-16-WB',
            size: '16oz',
            grind: 'whole-bean',
            price: 20.99,
            stripe_price_id: null,
          },
          {
            id: 'variant-2-4',
            name: 'Colombian Supremo - 16oz Ground',
            sku: 'COL-SUP-16-GR',
            size: '16oz',
            grind: 'medium',
            price: 20.99,
            stripe_price_id: null,
          }
        ]
      }
    },
    {
      sys: { id: 'product-3' },
      fields: {
        title: 'Guatemala Antigua',
        slug: 'guatemala-antigua',
        price: 17.99,
        featured: true,
        isNew: false,
        shortDescription: 'Rich and complex with notes of cocoa and spice.',
        description: 'Our Guatemala Antigua is grown in volcanic soil at high elevations. This medium-dark roast offers a rich, complex flavor profile with notes of cocoa, cinnamon, and orange zest.',
        origin: 'Guatemala',
        roastLevel: 'Medium-Dark',
        featuredImage: {
          fields: {
            file: {
              url: 'https://images.pexels.com/photos/2262675/pexels-photo-2262675.jpeg'
            }
          }
        },
        images: [
          { fields: { file: { url: 'https://images.pexels.com/photos/2262675/pexels-photo-2262675.jpeg' } } },
          { fields: { file: { url: 'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg' } } }
        ],
        variants: [
          {
            id: 'variant-3-1',
            name: 'Guatemala Antigua - 12oz Whole Bean',
            sku: 'GUA-ANT-12-WB',
            size: '12oz',
            grind: 'whole-bean',
            price: 17.99,
            stripe_price_id: null,
          },
          {
            id: 'variant-3-2',
            name: 'Guatemala Antigua - 12oz Ground',
            sku: 'GUA-ANT-12-GR',
            size: '12oz',
            grind: 'medium',
            price: 17.99,
            stripe_price_id: null,
          },
          {
            id: 'variant-3-3',
            name: 'Guatemala Antigua - 16oz Whole Bean',
            sku: 'GUA-ANT-16-WB',
            size: '16oz',
            grind: 'whole-bean',
            price: 22.99,
            stripe_price_id: null,
          },
          {
            id: 'variant-3-4',
            name: 'Guatemala Antigua - 16oz Ground',
            sku: 'GUA-ANT-16-GR',
            size: '16oz',
            grind: 'medium',
            price: 22.99,
            stripe_price_id: null,
          }
        ]
      }
    },
    {
      sys: { id: 'product-4' },
      fields: {
        title: 'Sumatra Mandheling',
        slug: 'sumatra-mandheling',
        price: 18.99,
        featured: true,
        isNew: false,
        shortDescription: 'Bold and earthy with notes of cedar and herbs.',
        description: 'Our Sumatra Mandheling is processed using the traditional wet-hulling method. This dark roast delivers a full-bodied cup with earthy, herbaceous notes, hints of cedar, and a long, smooth finish.',
        origin: 'Indonesia',
        roastLevel: 'Dark',
        featuredImage: {
          fields: {
            file: {
              url: 'https://images.pexels.com/photos/2252400/pexels-photo-2252400.jpeg'
            }
          }
        },
        images: [
          { fields: { file: { url: 'https://images.pexels.com/photos/2252400/pexels-photo-2252400.jpeg' } } },
          { fields: { file: { url: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg' } } }
        ],
        variants: [
          {
            id: 'variant-4-1',
            name: 'Sumatra Mandheling - 12oz Whole Bean',
            sku: 'SUM-MAN-12-WB',
            size: '12oz',
            grind: 'whole-bean',
            price: 18.99,
            stripe_price_id: null,
          },
          {
            id: 'variant-4-2',
            name: 'Sumatra Mandheling - 12oz Ground',
            sku: 'SUM-MAN-12-GR',
            size: '12oz',
            grind: 'medium',
            price: 18.99,
            stripe_price_id: null,
          },
          {
            id: 'variant-4-3',
            name: 'Sumatra Mandheling - 16oz Whole Bean',
            sku: 'SUM-MAN-16-WB',
            size: '16oz',
            grind: 'whole-bean',
            price: 23.99,
            stripe_price_id: null,
          },
          {
            id: 'variant-4-4',
            name: 'Sumatra Mandheling - 16oz Ground',
            sku: 'SUM-MAN-16-GR',
            size: '16oz',
            grind: 'medium',
            price: 23.99,
            stripe_price_id: null,
          }
        ]
      }
    }
  ];
}