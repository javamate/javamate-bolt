/* empty css                                */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_w5nKfbD5.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_DwEFYE8d.mjs';
import pkg from 'contentful';
/* empty css                               */
export { renderers } from '../renderers.mjs';

const { createClient } = pkg;
const client = createClient({
  space: "demo-space-id",
  accessToken: "demo-access-token",
  // Use preview if in development
  host: "cdn.contentful.com",
  ...false
});
async function getContentfulEntries(contentType, options = {}) {
  try {
    if (false) ;
    const entries = await client.getEntries({
      content_type: contentType,
      ...options
    });
    return entries.items;
  } catch (error) {
    console.error("Error fetching Contentful entries:", error);
    return getDemoData(contentType);
  }
}
function getDemoData(contentType) {
  switch (contentType) {
    case "product":
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
                  url: "https://www.rostovs.com/wp-content/uploads/2018/08/guatemala_antigua.jpg"
                }
              }
            },
            images: [
              { fields: { file: { url: "https://images.pexels.com/photos/2262675/pexels-photo-2262675.jpeg" } } },
              { fields: { file: { url: "https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg" } } }
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
                  url: "https://www.speederandearls.com/cdn/shop/products/Sumatra_Mandheling.jpg?v=1436889212"
                }
              }
            },
            images: [
              { fields: { file: { url: "https://images.pexels.com/photos/2252400/pexels-photo-2252400.jpeg" } } },
              { fields: { file: { url: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg" } } }
            ]
          }
        }
      ];
    default:
      return [];
  }
}

const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const featuredProducts = await getContentfulEntries("product", {
    "fields.featured": true,
    limit: 3
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Page Not Found", "description": "The page you're looking for doesn't exist. Discover our featured coffees or contact us for help.", "data-astro-cid-zetdm5md": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="section bg-white min-h-screen flex items-center" data-astro-cid-zetdm5md> <div class="container-custom" data-astro-cid-zetdm5md> <div class="max-w-4xl mx-auto text-center" data-astro-cid-zetdm5md> <!-- 404 Hero --> <div class="mb-16 reveal" data-astro-cid-zetdm5md> <div class="relative mb-8" data-astro-cid-zetdm5md> <!-- Large 404 with coffee cup illustration --> <div class="text-8xl md:text-9xl font-bold text-primary-100 select-none" data-astro-cid-zetdm5md>404</div> <div class="absolute inset-0 flex items-center justify-center" data-astro-cid-zetdm5md> <div class="w-32 h-32 md:w-40 md:h-40 bg-primary-600 rounded-full flex items-center justify-center transform rotate-12" data-astro-cid-zetdm5md> <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 md:h-20 md:w-20 text-white" fill="currentColor" viewBox="0 0 24 24" data-astro-cid-zetdm5md> <path d="M2 21h20v-2H2v2zm1.15-4.05L4 15.47l.85 1.48c.2.34.57.55.96.55s.76-.21.96-.55L7.6 15.47l.85 1.48c.2.34.57.55.96.55s.76-.21.96-.55L11.2 15.47l.85 1.48c.2.34.57.55.96.55s.76-.21.96-.55L14.8 15.47l.85 1.48c.2.34.57.55.96.55s.76-.21.96-.55L18.4 15.47l.85 1.48c.2.34.57.55.96.55s.76-.21.96-.55L22 15.47l-.85-1.48c-.2-.34-.57-.55-.96-.55s-.76.21-.96.55L18.4 15.47l-.85-1.48c-.2-.34-.57-.55-.96-.55s-.76.21-.96.55L14.8 15.47l-.85-1.48c-.2-.34-.57-.55-.96-.55s-.76.21-.96.55L11.2 15.47l-.85-1.48c-.2-.34-.57-.55-.96-.55s-.76.21-.96.55L7.6 15.47l-.85-1.48c-.2-.34-.57-.55-.96-.55s-.76.21-.96.55L4 15.47l-.85-1.48c-.2-.34-.57-.55-.96-.55s-.76.21-.96.55z" data-astro-cid-zetdm5md></path> <path d="M20 8.69V4h-2c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2H4v4.69c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zM18 8.69c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1V6h12v2.69z" data-astro-cid-zetdm5md></path> </svg> </div> </div> </div> <h1 class="mb-6 animate-fade-in" data-astro-cid-zetdm5md>Oops! This Page Went Missing</h1> <p class="text-xl text-primary-700 mb-8 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 0.2s;" data-astro-cid-zetdm5md>
It looks like the page you're looking for has been moved, deleted, or doesn't exist. 
            But don't worry – we have some great coffee to help you feel better!
</p> <div class="flex flex-wrap gap-4 justify-center animate-slide-up" style="animation-delay: 0.4s;" data-astro-cid-zetdm5md> <a href="/" class="btn-primary" data-astro-cid-zetdm5md>Go Home</a> <a href="/shop" class="btn-outline" data-astro-cid-zetdm5md>Browse Coffee</a> </div> </div> <!-- Featured Coffees Section --> ${featuredProducts.length > 0 && renderTemplate`<div class="mb-16 reveal" style="--reveal-delay: 0.6s" data-astro-cid-zetdm5md> <h2 class="mb-8" data-astro-cid-zetdm5md>While You're Here, Try These Popular Coffees</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-8" data-astro-cid-zetdm5md> ${featuredProducts.map((product, index) => renderTemplate`<div class="card group"${addAttribute(`--reveal-delay: ${0.7 + index * 0.1}s`, "style")} data-astro-cid-zetdm5md> <div class="relative overflow-hidden" data-astro-cid-zetdm5md> <img${addAttribute(product.fields.featuredImage?.fields.file.url || "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg", "src")}${addAttribute(product.fields.title, "alt")} class="w-full aspect-square object-cover transform group-hover:scale-105 transition-transform duration-500" loading="lazy" data-astro-cid-zetdm5md> ${product.fields.isNew && renderTemplate`<div class="absolute top-4 left-4 bg-accent-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full" data-astro-cid-zetdm5md>
New
</div>`} <div class="absolute top-4 right-4 bg-secondary-500 text-primary-900 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full" data-astro-cid-zetdm5md>
Featured
</div> </div> <div class="p-6" data-astro-cid-zetdm5md> <div class="flex items-center justify-between mb-2" data-astro-cid-zetdm5md> <span class="text-sm text-primary-600 font-medium" data-astro-cid-zetdm5md>${product.fields.origin}</span> <span class="text-sm text-primary-600" data-astro-cid-zetdm5md>${product.fields.roastLevel}</span> </div> <h3 class="text-xl mb-2 group-hover:text-primary-600 transition-colors" data-astro-cid-zetdm5md>${product.fields.title}</h3> <p class="text-primary-700 mb-4 line-clamp-2" data-astro-cid-zetdm5md>${product.fields.shortDescription}</p> <div class="flex items-center justify-between" data-astro-cid-zetdm5md> <span class="text-2xl font-bold text-primary-900" data-astro-cid-zetdm5md>$${product.fields.price.toFixed(2)}</span> <div class="flex gap-2" data-astro-cid-zetdm5md> <a${addAttribute(`/product/${product.fields.slug}`, "href")} class="btn-outline py-2 px-4 text-sm" data-astro-cid-zetdm5md>View</a> <button class="btn-primary py-2 px-4 text-sm add-to-cart"${addAttribute(product.sys.id, "data-product-id")} data-astro-cid-zetdm5md>
Add to Cart
</button> </div> </div> </div> </div>`)} </div> </div>`} <!-- Contact Section --> <div class="bg-primary-50 rounded-2xl p-8 md:p-12 reveal" style="--reveal-delay: 1s" data-astro-cid-zetdm5md> <div class="max-w-2xl mx-auto text-center" data-astro-cid-zetdm5md> <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6" data-astro-cid-zetdm5md> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-zetdm5md> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-zetdm5md></path> </svg> </div> <h3 class="text-2xl font-semibold mb-4" data-astro-cid-zetdm5md>Did You Encounter a Problem?</h3> <p class="text-primary-700 mb-6" data-astro-cid-zetdm5md>
If you believe this page should exist or if you encountered an error while browsing our site, 
              we'd love to hear from you. Your feedback helps us improve the experience for everyone.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center" data-astro-cid-zetdm5md> <a href="/contact" class="btn-primary" data-astro-cid-zetdm5md> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-zetdm5md> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-astro-cid-zetdm5md></path> </svg>
Contact Us
</a> <a href="mailto:hello@javamatecoffee.com" class="btn-outline" data-astro-cid-zetdm5md> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-zetdm5md> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" data-astro-cid-zetdm5md></path> </svg>
Call Us
</a> </div> <div class="mt-8 pt-6 border-t border-primary-200" data-astro-cid-zetdm5md> <p class="text-sm text-primary-600" data-astro-cid-zetdm5md> <strong data-astro-cid-zetdm5md>Quick Help:</strong> Try searching for what you need, check our
<a href="/shop" class="text-primary-800 hover:text-primary-600 underline" data-astro-cid-zetdm5md>coffee collection</a>, 
                or visit our <a href="/contact" class="text-primary-800 hover:text-primary-600 underline" data-astro-cid-zetdm5md>contact page</a>
for more assistance.
</p> </div> </div> </div> <!-- Search Suggestions --> <div class="mt-12 reveal" style="--reveal-delay: 1.2s" data-astro-cid-zetdm5md> <h3 class="text-xl font-semibold mb-6" data-astro-cid-zetdm5md>Popular Pages</h3> <div class="grid grid-cols-2 md:grid-cols-4 gap-4" data-astro-cid-zetdm5md> <a href="/shop" class="p-4 bg-white rounded-lg shadow-soft hover:shadow-medium transition-shadow text-center group" data-astro-cid-zetdm5md> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-600 mx-auto mb-2 group-hover:text-primary-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-zetdm5md> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" data-astro-cid-zetdm5md></path> </svg> <span class="text-sm font-medium" data-astro-cid-zetdm5md>Shop Coffee</span> </a> <a href="/about" class="p-4 bg-white rounded-lg shadow-soft hover:shadow-medium transition-shadow text-center group" data-astro-cid-zetdm5md> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-600 mx-auto mb-2 group-hover:text-primary-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-zetdm5md> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-zetdm5md></path> </svg> <span class="text-sm font-medium" data-astro-cid-zetdm5md>Our Story</span> </a> <a href="/contact" class="p-4 bg-white rounded-lg shadow-soft hover:shadow-medium transition-shadow text-center group" data-astro-cid-zetdm5md> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-600 mx-auto mb-2 group-hover:text-primary-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-zetdm5md> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-astro-cid-zetdm5md></path> </svg> <span class="text-sm font-medium" data-astro-cid-zetdm5md>Contact</span> </a> <a href="/" class="p-4 bg-white rounded-lg shadow-soft hover:shadow-medium transition-shadow text-center group" data-astro-cid-zetdm5md> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-600 mx-auto mb-2 group-hover:text-primary-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-zetdm5md> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-astro-cid-zetdm5md></path> </svg> <span class="text-sm font-medium" data-astro-cid-zetdm5md>Home</span> </a> </div> </div> </div> </div> </section> ` })} `;
}, "/home/project/src/pages/404.astro", void 0);

const $$file = "/home/project/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
