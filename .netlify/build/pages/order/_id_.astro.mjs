/* empty css                                   */
import { e as createComponent, f as createAstro, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_w5nKfbD5.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_DwEFYE8d.mjs';
/* empty css                                   */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  if (!id) {
    return Astro2.redirect("/404");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Order Details", "description": "View your order details and items", "data-astro-cid-iz3g3gzo": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="auth-loading" class="min-h-screen bg-primary-50 flex items-center justify-center" data-astro-cid-iz3g3gzo> <div class="text-center" data-astro-cid-iz3g3gzo> <div class="coffee-loader mb-4" data-astro-cid-iz3g3gzo></div> <p class="text-primary-600" data-astro-cid-iz3g3gzo>Loading order details...</p> </div> </div> <div id="order-content" class="hidden" data-astro-cid-iz3g3gzo> <section class="bg-primary-900 text-white py-16 md:py-24" data-astro-cid-iz3g3gzo> <div class="container-custom" data-astro-cid-iz3g3gzo> <div class="max-w-3xl mx-auto text-center" data-astro-cid-iz3g3gzo> <h1 class="mb-4 animate-fade-in" data-astro-cid-iz3g3gzo>Order Details</h1> <p class="text-lg text-primary-100 animate-slide-up" style="animation-delay: 0.2s;" data-astro-cid-iz3g3gzo>
View your order information and items
</p> </div> </div> </section> <section class="section bg-white" data-astro-cid-iz3g3gzo> <div class="container-custom" data-astro-cid-iz3g3gzo> <div class="max-w-4xl mx-auto" data-astro-cid-iz3g3gzo> <!-- Breadcrumb --> <nav class="mb-8" data-astro-cid-iz3g3gzo> <ol class="flex items-center space-x-2 text-sm text-primary-600" data-astro-cid-iz3g3gzo> <li data-astro-cid-iz3g3gzo><a href="/" class="hover:text-primary-800" data-astro-cid-iz3g3gzo>Home</a></li> <li data-astro-cid-iz3g3gzo><span class="mx-2" data-astro-cid-iz3g3gzo>/</span></li> <li data-astro-cid-iz3g3gzo><a href="/dashboard" class="hover:text-primary-800" data-astro-cid-iz3g3gzo>Dashboard</a></li> <li data-astro-cid-iz3g3gzo><span class="mx-2" data-astro-cid-iz3g3gzo>/</span></li> <li class="text-primary-900" data-astro-cid-iz3g3gzo>Order <span id="breadcrumb-order-id" data-astro-cid-iz3g3gzo>#${id}</span></li> </ol> </nav> <!-- Order Header --> <div class="card p-6 mb-8" data-astro-cid-iz3g3gzo> <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6" data-astro-cid-iz3g3gzo> <div data-astro-cid-iz3g3gzo> <h2 class="text-2xl font-semibold mb-2" data-astro-cid-iz3g3gzo>Order <span id="order-number" data-astro-cid-iz3g3gzo>#${id}</span></h2> <p class="text-primary-600" id="order-date" data-astro-cid-iz3g3gzo>Loading...</p> </div> <div class="mt-4 md:mt-0" data-astro-cid-iz3g3gzo> <span id="order-status-badge" class="px-4 py-2 rounded-full text-sm font-medium" data-astro-cid-iz3g3gzo>
Loading...
</span> </div> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-astro-cid-iz3g3gzo> <div data-astro-cid-iz3g3gzo> <h3 class="font-semibold text-primary-900 mb-2" data-astro-cid-iz3g3gzo>Payment Status</h3> <p id="payment-status" class="text-primary-700" data-astro-cid-iz3g3gzo>Loading...</p> </div> <div data-astro-cid-iz3g3gzo> <h3 class="font-semibold text-primary-900 mb-2" data-astro-cid-iz3g3gzo>Total Amount</h3> <p id="total-amount" class="text-2xl font-bold text-primary-900" data-astro-cid-iz3g3gzo>Loading...</p> </div> <div data-astro-cid-iz3g3gzo> <h3 class="font-semibold text-primary-900 mb-2" data-astro-cid-iz3g3gzo>Currency</h3> <p id="currency" class="text-primary-700" data-astro-cid-iz3g3gzo>Loading...</p> </div> </div> </div> <!-- Order Items --> <div class="card p-6 mb-8" data-astro-cid-iz3g3gzo> <h3 class="text-xl font-semibold mb-6" data-astro-cid-iz3g3gzo>Order Items</h3> <div id="order-items" class="space-y-4" data-astro-cid-iz3g3gzo> <!-- Items will be populated by JavaScript --> <div class="text-center py-8" data-astro-cid-iz3g3gzo> <div class="coffee-loader mb-4" data-astro-cid-iz3g3gzo></div> <p class="text-primary-600" data-astro-cid-iz3g3gzo>Loading order items...</p> </div> </div> </div> <!-- Order Summary --> <div class="card p-6 mb-8" data-astro-cid-iz3g3gzo> <h3 class="text-xl font-semibold mb-6" data-astro-cid-iz3g3gzo>Order Summary</h3> <div class="space-y-3" data-astro-cid-iz3g3gzo> <div class="flex justify-between" data-astro-cid-iz3g3gzo> <span class="text-primary-700" data-astro-cid-iz3g3gzo>Subtotal</span> <span id="subtotal-amount" data-astro-cid-iz3g3gzo>Loading...</span> </div> <div class="flex justify-between" data-astro-cid-iz3g3gzo> <span class="text-primary-700" data-astro-cid-iz3g3gzo>Shipping</span> <span id="shipping-amount" class="text-success-600" data-astro-cid-iz3g3gzo>FREE</span> </div> <div class="flex justify-between" data-astro-cid-iz3g3gzo> <span class="text-primary-700" data-astro-cid-iz3g3gzo>Tax</span> <span id="tax-amount" data-astro-cid-iz3g3gzo>$0.00</span> </div> <hr class="border-primary-200" data-astro-cid-iz3g3gzo> <div class="flex justify-between text-lg font-semibold" data-astro-cid-iz3g3gzo> <span data-astro-cid-iz3g3gzo>Total</span> <span id="summary-total" data-astro-cid-iz3g3gzo>Loading...</span> </div> </div> </div> <!-- Payment Information --> <div class="card p-6 mb-8" data-astro-cid-iz3g3gzo> <h3 class="text-xl font-semibold mb-6" data-astro-cid-iz3g3gzo>Payment Information</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-astro-cid-iz3g3gzo> <div data-astro-cid-iz3g3gzo> <h4 class="font-medium text-primary-900 mb-2" data-astro-cid-iz3g3gzo>Payment Method</h4> <div class="flex items-center" data-astro-cid-iz3g3gzo> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-iz3g3gzo> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" data-astro-cid-iz3g3gzo></path> </svg> <span class="text-primary-700" data-astro-cid-iz3g3gzo>Credit Card</span> </div> </div> <div data-astro-cid-iz3g3gzo> <h4 class="font-medium text-primary-900 mb-2" data-astro-cid-iz3g3gzo>Transaction ID</h4> <p id="transaction-id" class="text-primary-700 font-mono text-sm" data-astro-cid-iz3g3gzo>Loading...</p> </div> </div> </div> <!-- Actions --> <div class="flex flex-col sm:flex-row gap-4" data-astro-cid-iz3g3gzo> <a href="/dashboard" class="btn-outline" data-astro-cid-iz3g3gzo> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-iz3g3gzo> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-astro-cid-iz3g3gzo></path> </svg>
Back to Dashboard
</a> <a href="/shop" class="btn-primary" data-astro-cid-iz3g3gzo>
Continue Shopping
</a> <button id="print-order" class="btn-outline" data-astro-cid-iz3g3gzo> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-iz3g3gzo> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" data-astro-cid-iz3g3gzo></path> </svg>
Print Order
</button> </div> </div> </div> </section> </div>  <div id="error-content" class="hidden" data-astro-cid-iz3g3gzo> <section class="min-h-screen bg-primary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" data-astro-cid-iz3g3gzo> <div class="max-w-2xl w-full" data-astro-cid-iz3g3gzo> <div class="bg-white rounded-lg shadow-medium p-8 text-center" data-astro-cid-iz3g3gzo> <!-- Error Icon --> <div class="w-20 h-20 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-6" data-astro-cid-iz3g3gzo> <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-error-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-iz3g3gzo> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-iz3g3gzo></path> </svg> </div> <h1 class="text-3xl font-bold text-primary-900 mb-4" data-astro-cid-iz3g3gzo>Order Not Found</h1> <p class="text-lg text-primary-700 mb-8" id="error-message" data-astro-cid-iz3g3gzo>
We couldn't find the order you're looking for. It may not exist or you may not have permission to view it.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center" data-astro-cid-iz3g3gzo> <a href="/dashboard" class="btn-primary" data-astro-cid-iz3g3gzo>
Go to Dashboard
</a> <a href="/contact" class="btn-outline" data-astro-cid-iz3g3gzo>
Contact Support
</a> </div> </div> </div> </section> </div> ` })} ${renderScript($$result, "/home/project/src/pages/order/[id].astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/project/src/pages/order/[id].astro", void 0);

const $$file = "/home/project/src/pages/order/[id].astro";
const $$url = "/order/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
