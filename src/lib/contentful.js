import pkg from 'contentful';
const { createClient } = pkg;

// Initialize Contentful client
const client = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID || 'demo-space-id',
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN || 'demo-access-token',
  // Use preview if in development
  host: import.meta.env.DEV ? 'preview.contentful.com' : 'cdn.contentful.com',
  ...(import.meta.env.DEV && {
    accessToken: import.meta.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN || 'demo-preview-token',
  }),
});

/**
 * Fetch entries from Contentful
 * @param {string} contentType - The content type to fetch
 * @param {Object} options - Additional query options
 * @returns {Promise<Array>} - Array of entries
 */
export async function getContentfulEntries(contentType, options = {}) {
  try {
    // Use demo data if in development without Contentful credentials
    if (import.meta.env.DEV && import.meta.env.CONTENTFUL_SPACE_ID === undefined) {
      return getDemoData(contentType);
    }
    
    const entries = await client.getEntries({
      content_type: contentType,
      ...options,
    });
    
    return entries.items;
  } catch (error) {
    console.error('Error fetching Contentful entries:', error);
    // Return demo data as fallback
    return getDemoData(contentType);
  }
}

/**
 * Fetch a single entry from Contentful by slug
 * @param {string} contentType - The content type to fetch
 * @param {string} slug - The slug of the entry
 * @returns {Promise<Object>} - The entry
 */
export async function getContentfulEntry(contentType, slug) {
  try {
    // Use demo data if in development without Contentful credentials
    if (import.meta.env.DEV && import.meta.env.CONTENTFUL_SPACE_ID === undefined) {
      const demoData = getDemoData(contentType);
      return demoData.find(item => item.fields.slug === slug) || null;
    }
    
    const entries = await client.getEntries({
      content_type: contentType,
      'fields.slug': slug,
      limit: 1,
    });
    
    return entries.items[0] || null;
  } catch (error) {
    console.error('Error fetching Contentful entry:', error);
    // Return demo data as fallback
    const demoData = getDemoData(contentType);
    return demoData.find(item => item.fields.slug === slug) || null;
  }
}

/**
 * Generate demo data for development
 * @param {string} contentType - The content type to generate data for
 * @returns {Array} - Array of demo entries
 */
function getDemoData(contentType) {
  switch (contentType) {
    case 'product':
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
                  url: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=800'
                }
              }
            },
            images: [
              { fields: { file: { url: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=800' } } },
              { fields: { file: { url: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=800' } } }
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
                  url: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=800'
                }
              }
            },
            images: [
              { fields: { file: { url: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=800' } } },
              { fields: { file: { url: 'https://images.pexels.com/photos/585753/pexels-photo-585753.jpeg?auto=compress&cs=tinysrgb&w=800' } } }
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
                  url: 'https://images.pexels.com/photos/2262675/pexels-photo-2262675.jpeg?auto=compress&cs=tinysrgb&w=800'
                }
              }
            },
            images: [
              { fields: { file: { url: 'https://images.pexels.com/photos/2262675/pexels-photo-2262675.jpeg?auto=compress&cs=tinysrgb&w=800' } } },
              { fields: { file: { url: 'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=800' } } }
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
                  url: 'https://images.pexels.com/photos/2252400/pexels-photo-2252400.jpeg?auto=compress&cs=tinysrgb&w=800'
                }
              }
            },
            images: [
              { fields: { file: { url: 'https://images.pexels.com/photos/2252400/pexels-photo-2252400.jpeg?auto=compress&cs=tinysrgb&w=800' } } },
              { fields: { file: { url: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=800' } } }
            ]
          }
        },
        {
          sys: { id: 'product-5' },
          fields: {
            title: 'Organic Peru SWP Decaf',
            slug: 'organic-peru-swp-decaf',
            price: 19.99,
            featured: false,
            isNew: true,
            shortDescription: 'Chemical-free decaf with rich chocolate and caramel notes.',
            description: 'Our Organic Peru SWP Decaf is processed using the Swiss Water Process, a chemical-free decaffeination method that preserves the coffee\'s natural flavors while removing 99.9% of the caffeine.',
            origin: 'Peru',
            roastLevel: 'Medium',
            featuredImage: {
              fields: {
                file: {
                  url: 'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=800'
                }
              }
            },
            images: [
              { fields: { file: { url: 'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=800' } } },
              { fields: { file: { url: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=800' } } }
            ]
          }
        },
        {
          sys: { id: 'product-6' },
          fields: {
            title: 'Javamate House Blend',
            slug: 'javamate-house-blend',
            price: 14.99,
            featured: true,
            isNew: false,
            shortDescription: 'Our signature blend with perfect balance and versatility.',
            description: 'Our signature House Blend combines the best characteristics of Central and South American coffees to create a perfectly balanced, approachable coffee that\'s perfect for any time of day.',
            origin: 'Blend (Colombia, Brazil, Guatemala)',
            roastLevel: 'Medium',
            featuredImage: {
              fields: {
                file: {
                  url: 'https://images.pexels.com/photos/585753/pexels-photo-585753.jpeg?auto=compress&cs=tinysrgb&w=800'
                }
              }
            },
            images: [
              { fields: { file: { url: 'https://images.pexels.com/photos/585753/pexels-photo-585753.jpeg?auto=compress&cs=tinysrgb&w=800' } } },
              { fields: { file: { url: 'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=800' } } }
            ]
          }
        }
      ];
    default:
      return [];
  }
}