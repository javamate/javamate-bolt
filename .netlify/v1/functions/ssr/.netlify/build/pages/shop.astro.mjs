/* empty css                                */
import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_w5nKfbD5.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_DwEFYE8d.mjs';
import { g as getCrystallizeProducts } from '../chunks/crystallize_YFi5Y__O.mjs';
/* empty css                                */
export { renderers } from '../renderers.mjs';

const $$Shop = createComponent(async ($$result, $$props, $$slots) => {
  const products = await getCrystallizeProducts({ limit: 50 });
  const origins = [...new Set(products.map((p) => p.fields.origin).filter(Boolean))];
  const roastLevels = [...new Set(products.map((p) => p.fields.roastLevel).filter(Boolean))];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Shop Coffee", "description": "Browse our selection of freshly roasted specialty coffee beans from around the world.", "data-astro-cid-5w43p2qc": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-primary-900 text-white py-16 md:py-24" data-astro-cid-5w43p2qc> <div class="container-custom" data-astro-cid-5w43p2qc> <div class="max-w-3xl mx-auto text-center" data-astro-cid-5w43p2qc> <h1 class="mb-4 animate-fade-in" data-astro-cid-5w43p2qc>Shop Our Coffee</h1> <p class="text-lg text-primary-100 animate-slide-up" style="animation-delay: 0.2s;" data-astro-cid-5w43p2qc>
Discover our carefully curated selection of single-origin and blend coffees, roasted to perfection.
</p> </div> </div> </section> <section class="section bg-white" data-astro-cid-5w43p2qc> <div class="container-custom" data-astro-cid-5w43p2qc> <!-- Filters --> <div class="mb-12 reveal" data-astro-cid-5w43p2qc> <div class="flex flex-wrap gap-4 justify-center" data-astro-cid-5w43p2qc> <button class="filter-btn active" data-filter="all" data-astro-cid-5w43p2qc>All Coffees</button> <button class="filter-btn" data-filter="featured" data-astro-cid-5w43p2qc>Featured</button> <button class="filter-btn" data-filter="new" data-astro-cid-5w43p2qc>New Arrivals</button> ${origins.map((origin) => renderTemplate`<button class="filter-btn"${addAttribute(origin.toLowerCase().replace(/\s+/g, "-"), "data-filter")} data-astro-cid-5w43p2qc>${origin}</button>`)} </div> <div class="mt-6 flex flex-wrap gap-4 justify-center" data-astro-cid-5w43p2qc> <select id="roast-filter" class="form-input max-w-xs" data-astro-cid-5w43p2qc> <option value="" data-astro-cid-5w43p2qc>All Roast Levels</option> ${roastLevels.map((level) => renderTemplate`<option${addAttribute(level.toLowerCase().replace(/\s+/g, "-"), "value")} data-astro-cid-5w43p2qc>${level}</option>`)} </select> <select id="sort-filter" class="form-input max-w-xs" data-astro-cid-5w43p2qc> <option value="featured" data-astro-cid-5w43p2qc>Sort by Featured</option> <option value="price-low" data-astro-cid-5w43p2qc>Price: Low to High</option> <option value="price-high" data-astro-cid-5w43p2qc>Price: High to Low</option> <option value="name" data-astro-cid-5w43p2qc>Name: A to Z</option> </select> </div> </div> <!-- Products Grid --> <div id="products-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 reveal" data-astro-cid-5w43p2qc> ${products.map((product) => renderTemplate`<div class="product-card card group"${addAttribute(product.fields.featured ? "true" : "false", "data-featured")}${addAttribute(product.fields.isNew ? "true" : "false", "data-new")}${addAttribute(product.fields.origin?.toLowerCase().replace(/\s+/g, "-") || "", "data-origin")}${addAttribute(product.fields.roastLevel?.toLowerCase().replace(/\s+/g, "-") || "", "data-roast")}${addAttribute(product.fields.price, "data-price")}${addAttribute(product.fields.title.toLowerCase(), "data-name")} data-astro-cid-5w43p2qc> <div class="relative overflow-hidden" data-astro-cid-5w43p2qc> <img${addAttribute(product.fields.featuredImage?.fields.file.url || "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg", "src")}${addAttribute(product.fields.title, "alt")} class="w-full aspect-square object-cover transform group-hover:scale-105 transition-transform duration-500" loading="lazy" data-astro-cid-5w43p2qc> ${product.fields.isNew && renderTemplate`<div class="absolute top-4 left-4 bg-accent-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full" data-astro-cid-5w43p2qc>
New
</div>`} ${product.fields.featured && renderTemplate`<div class="absolute top-4 right-4 bg-secondary-500 text-primary-900 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full" data-astro-cid-5w43p2qc>
Featured
</div>`} </div> <div class="p-6" data-astro-cid-5w43p2qc> <div class="flex items-center justify-between mb-2" data-astro-cid-5w43p2qc> <span class="text-sm text-primary-600 font-medium" data-astro-cid-5w43p2qc>${product.fields.origin}</span> <span class="text-sm text-primary-600" data-astro-cid-5w43p2qc>${product.fields.roastLevel}</span> </div> <h3 class="text-xl mb-2 group-hover:text-primary-600 transition-colors" data-astro-cid-5w43p2qc>${product.fields.title}</h3> <p class="text-primary-700 mb-4 line-clamp-2" data-astro-cid-5w43p2qc>${product.fields.shortDescription}</p> <div class="flex items-center justify-between" data-astro-cid-5w43p2qc> <span class="text-2xl font-bold text-primary-900" data-astro-cid-5w43p2qc>
From $${Math.min(...product.fields.variants.map((v) => v.price)).toFixed(2)} </span> <div class="flex gap-2" data-astro-cid-5w43p2qc> <a${addAttribute(`/product/${product.fields.slug}`, "href")} class="btn-outline py-2 px-4 text-sm" data-astro-cid-5w43p2qc>View</a> <button class="btn-primary py-2 px-4 text-sm add-to-cart"${addAttribute(product.sys.id, "data-product-id")} data-astro-cid-5w43p2qc>
Add to Cart
</button> </div> </div> </div> </div>`)} </div> <!-- Empty State --> <div id="no-products" class="hidden text-center py-16" data-astro-cid-5w43p2qc> <div class="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6" data-astro-cid-5w43p2qc> <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-5w43p2qc> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-astro-cid-5w43p2qc></path> </svg> </div> <h3 class="text-2xl font-semibold mb-2" data-astro-cid-5w43p2qc>No products found</h3> <p class="text-primary-600 mb-6" data-astro-cid-5w43p2qc>Try adjusting your filters to see more results.</p> <button id="clear-filters" class="btn-primary" data-astro-cid-5w43p2qc>Clear All Filters</button> </div> </div> </section> ` })} ${renderScript($$result, "/home/project/src/pages/shop.astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/project/src/pages/shop.astro", void 0);

const $$file = "/home/project/src/pages/shop.astro";
const $$url = "/shop";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Shop,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
