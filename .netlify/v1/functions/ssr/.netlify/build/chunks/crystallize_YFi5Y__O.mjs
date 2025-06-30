import { createClient } from '@crystallize/js-api-client';

const client = createClient({
  tenantIdentifier: "javamate",
  accessTokenId: "ef1e5e8007e231523b6b",
  accessTokenSecret: "83fb1b54e1daf882dacb7caf07e633e297726dda"
});
createClient({
  tenantIdentifier: "javamate",
  accessTokenId: "ef1e5e8007e231523b6b",
  accessTokenSecret: "83fb1b54e1daf882dacb7caf07e633e297726dda",
  origin: "https://pim.crystallize.com"
});
async function getCrystallizeProducts(options = {}) {
  try {
    if (false) ;
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
      language: options.language || "en"
    };
    const response = await client.catalogueApi(query, variables);
    if (!response.data?.catalogue?.children?.edges) {
      console.warn("No products found in Crystallize response");
      return getDemoProducts();
    }
    return response.data.catalogue.children.edges.map((edge) => edge.node).filter((node) => node.type === "product").map(transformCrystallizeProduct);
  } catch (error) {
    console.error("Error fetching Crystallize products:", error);
    return getDemoProducts();
  }
}
function transformCrystallizeProduct(crystallizeProduct) {
  const defaultVariant = crystallizeProduct.defaultVariant;
  const variants = crystallizeProduct.variants || [];
  const attributes = {};
  if (defaultVariant.attributes) {
    defaultVariant.attributes.forEach((attr) => {
      attributes[attr.attribute] = attr.value;
    });
  }
  const transformedVariants = variants.map((variant) => {
    const variantAttributes = {};
    if (variant.attributes) {
      variant.attributes.forEach((attr) => {
        variantAttributes[attr.attribute] = attr.value;
      });
    }
    return {
      id: variant.id,
      name: variant.name,
      sku: variant.sku,
      size: variantAttributes.size || "12oz",
      grind: variantAttributes.grind || "whole-bean",
      price: variant.price || 0,
      priceVariants: variant.priceVariants || [],
      stripe_price_id: variant.externalReference || null,
      subscriptionPlans: variant.subscriptionPlans || []
    };
  });
  if (transformedVariants.length === 0 && defaultVariant) {
    transformedVariants.push({
      id: defaultVariant.id,
      name: defaultVariant.name,
      sku: defaultVariant.sku,
      size: attributes.size || "12oz",
      grind: attributes.grind || "whole-bean",
      price: defaultVariant.price || 0,
      priceVariants: defaultVariant.priceVariants || [],
      stripe_price_id: defaultVariant.externalReference || null,
      subscriptionPlans: []
    });
  }
  return {
    sys: { id: crystallizeProduct.id },
    fields: {
      title: crystallizeProduct.name,
      slug: crystallizeProduct.path?.replace("/", "") || crystallizeProduct.name.toLowerCase().replace(/\s+/g, "-"),
      price: defaultVariant?.price || 0,
      featured: attributes.featured === "true" || false,
      isNew: attributes.isNew === "true" || false,
      shortDescription: attributes.shortDescription || "",
      description: attributes.description || "",
      origin: attributes.origin || "",
      roastLevel: attributes.roastLevel || "",
      featuredImage: defaultVariant?.images?.[0] ? {
        fields: {
          file: {
            url: defaultVariant.images[0].url
          }
        }
      } : null,
      images: defaultVariant?.images?.map((img) => ({
        fields: {
          file: {
            url: img.url
          }
        }
      })) || [],
      variants: transformedVariants
    }
  };
}
function getDemoProducts() {
  return [
    {
      sys: { id: "product-1" },
      fields: {
        title: "Ethiopian Yirgacheffe",
        slug: "ethiopian-yirgacheffe",
        price: 16.99,
        featured: true,
        isNew: true,
        shortDescription: "Bright and fruity with notes of bergamot and lemon.",
        description: "Our Ethiopian Yirgacheffe is sourced from the highlands of Ethiopia, the birthplace of coffee. This light roast highlights the complex, bright flavors with notes of citrus, bergamot, and a floral finish.",
        origin: "Ethiopia",
        roastLevel: "Light",
        featuredImage: {
          fields: {
            file: {
              url: "https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg"
            }
          }
        },
        images: [
          { fields: { file: { url: "https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg" } } },
          { fields: { file: { url: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg" } } }
        ],
        variants: [
          {
            id: "variant-1-1",
            name: "Ethiopian Yirgacheffe - 12oz Whole Bean",
            sku: "ETH-YIR-12-WB",
            size: "12oz",
            grind: "whole-bean",
            price: 16.99,
            stripe_price_id: "price_1RKgo2R1hBQXgqR7RYvtL02O"
          },
          {
            id: "variant-1-2",
            name: "Ethiopian Yirgacheffe - 12oz Ground",
            sku: "ETH-YIR-12-GR",
            size: "12oz",
            grind: "medium",
            price: 16.99,
            stripe_price_id: null
          },
          {
            id: "variant-1-3",
            name: "Ethiopian Yirgacheffe - 16oz Whole Bean",
            sku: "ETH-YIR-16-WB",
            size: "16oz",
            grind: "whole-bean",
            price: 21.99,
            stripe_price_id: null
          },
          {
            id: "variant-1-4",
            name: "Ethiopian Yirgacheffe - 16oz Ground",
            sku: "ETH-YIR-16-GR",
            size: "16oz",
            grind: "medium",
            price: 21.99,
            stripe_price_id: null
          }
        ]
      }
    },
    {
      sys: { id: "product-2" },
      fields: {
        title: "Colombian Supremo",
        slug: "colombian-supremo",
        price: 15.99,
        featured: true,
        isNew: false,
        shortDescription: "Sweet and balanced with notes of caramel and chocolate.",
        description: "Our Colombian Supremo comes from the high-altitude regions of Colombia. This medium roast offers a perfect balance of sweetness with notes of caramel and milk chocolate, with a smooth, clean finish.",
        origin: "Colombia",
        roastLevel: "Medium",
        featuredImage: {
          fields: {
            file: {
              url: "https://images.pexels.com/photos/2299028/pexels-photo-2299028.jpeg"
            }
          }
        },
        images: [
          { fields: { file: { url: "https://images.pexels.com/photos/2299028/pexels-photo-2299028.jpeg" } } },
          { fields: { file: { url: "https://images.pexels.com/photos/585753/pexels-photo-585753.jpeg" } } }
        ],
        variants: [
          {
            id: "variant-2-1",
            name: "Colombian Supremo - 12oz Whole Bean",
            sku: "COL-SUP-12-WB",
            size: "12oz",
            grind: "whole-bean",
            price: 15.99,
            stripe_price_id: null
          },
          {
            id: "variant-2-2",
            name: "Colombian Supremo - 12oz Ground",
            sku: "COL-SUP-12-GR",
            size: "12oz",
            grind: "medium",
            price: 15.99,
            stripe_price_id: null
          },
          {
            id: "variant-2-3",
            name: "Colombian Supremo - 16oz Whole Bean",
            sku: "COL-SUP-16-WB",
            size: "16oz",
            grind: "whole-bean",
            price: 20.99,
            stripe_price_id: null
          },
          {
            id: "variant-2-4",
            name: "Colombian Supremo - 16oz Ground",
            sku: "COL-SUP-16-GR",
            size: "16oz",
            grind: "medium",
            price: 20.99,
            stripe_price_id: null
          }
        ]
      }
    },
    {
      sys: { id: "product-3" },
      fields: {
        title: "Guatemala Antigua",
        slug: "guatemala-antigua",
        price: 17.99,
        featured: true,
        isNew: false,
        shortDescription: "Rich and complex with notes of cocoa and spice.",
        description: "Our Guatemala Antigua is grown in volcanic soil at high elevations. This medium-dark roast offers a rich, complex flavor profile with notes of cocoa, cinnamon, and orange zest.",
        origin: "Guatemala",
        roastLevel: "Medium-Dark",
        featuredImage: {
          fields: {
            file: {
              url: "https://images.pexels.com/photos/2262675/pexels-photo-2262675.jpeg"
            }
          }
        },
        images: [
          { fields: { file: { url: "https://images.pexels.com/photos/2262675/pexels-photo-2262675.jpeg" } } },
          { fields: { file: { url: "https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg" } } }
        ],
        variants: [
          {
            id: "variant-3-1",
            name: "Guatemala Antigua - 12oz Whole Bean",
            sku: "GUA-ANT-12-WB",
            size: "12oz",
            grind: "whole-bean",
            price: 17.99,
            stripe_price_id: null
          },
          {
            id: "variant-3-2",
            name: "Guatemala Antigua - 12oz Ground",
            sku: "GUA-ANT-12-GR",
            size: "12oz",
            grind: "medium",
            price: 17.99,
            stripe_price_id: null
          },
          {
            id: "variant-3-3",
            name: "Guatemala Antigua - 16oz Whole Bean",
            sku: "GUA-ANT-16-WB",
            size: "16oz",
            grind: "whole-bean",
            price: 22.99,
            stripe_price_id: null
          },
          {
            id: "variant-3-4",
            name: "Guatemala Antigua - 16oz Ground",
            sku: "GUA-ANT-16-GR",
            size: "16oz",
            grind: "medium",
            price: 22.99,
            stripe_price_id: null
          }
        ]
      }
    },
    {
      sys: { id: "product-4" },
      fields: {
        title: "Sumatra Mandheling",
        slug: "sumatra-mandheling",
        price: 18.99,
        featured: true,
        isNew: false,
        shortDescription: "Bold and earthy with notes of cedar and herbs.",
        description: "Our Sumatra Mandheling is processed using the traditional wet-hulling method. This dark roast delivers a full-bodied cup with earthy, herbaceous notes, hints of cedar, and a long, smooth finish.",
        origin: "Indonesia",
        roastLevel: "Dark",
        featuredImage: {
          fields: {
            file: {
              url: "https://images.pexels.com/photos/2252400/pexels-photo-2252400.jpeg"
            }
          }
        },
        images: [
          { fields: { file: { url: "https://images.pexels.com/photos/2252400/pexels-photo-2252400.jpeg" } } },
          { fields: { file: { url: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg" } } }
        ],
        variants: [
          {
            id: "variant-4-1",
            name: "Sumatra Mandheling - 12oz Whole Bean",
            sku: "SUM-MAN-12-WB",
            size: "12oz",
            grind: "whole-bean",
            price: 18.99,
            stripe_price_id: null
          },
          {
            id: "variant-4-2",
            name: "Sumatra Mandheling - 12oz Ground",
            sku: "SUM-MAN-12-GR",
            size: "12oz",
            grind: "medium",
            price: 18.99,
            stripe_price_id: null
          },
          {
            id: "variant-4-3",
            name: "Sumatra Mandheling - 16oz Whole Bean",
            sku: "SUM-MAN-16-WB",
            size: "16oz",
            grind: "whole-bean",
            price: 23.99,
            stripe_price_id: null
          },
          {
            id: "variant-4-4",
            name: "Sumatra Mandheling - 16oz Ground",
            sku: "SUM-MAN-16-GR",
            size: "16oz",
            grind: "medium",
            price: 23.99,
            stripe_price_id: null
          }
        ]
      }
    }
  ];
}

export { getCrystallizeProducts as g };
