/* empty css                                */
import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_w5nKfbD5.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_DwEFYE8d.mjs';
export { renderers } from '../renderers.mjs';

const $$Success = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Purchase Successful", "description": "Thank you for your purchase from Javamate Coffee" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="loading-screen" class="min-h-screen bg-primary-50 flex items-center justify-center"> <div class="text-center"> <div class="coffee-loader mb-4"></div> <p class="text-primary-600">Confirming your purchase...</p> </div> </div> <div id="success-content" class="hidden"> <section class="min-h-screen bg-primary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"> <div class="max-w-2xl w-full"> <div class="bg-white rounded-lg shadow-medium p-8 text-center"> <!-- Success Icon --> <div class="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6"> <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> </div> <h1 class="text-3xl font-bold text-primary-900 mb-4">Purchase Successful!</h1> <div id="purchase-details" class="mb-8"> <p class="text-lg text-primary-700 mb-4">Thank you for your purchase from Javamate Coffee.</p> <div class="bg-primary-50 rounded-lg p-6 mb-6"> <h3 class="font-semibold text-primary-900 mb-4">Order Details</h3> <div id="order-info" class="space-y-2 text-left"> <div class="flex justify-between"> <span class="text-primary-600">Order ID:</span> <span id="order-id" class="font-medium">Loading...</span> </div> <div class="flex justify-between"> <span class="text-primary-600">Product:</span> <span id="product-name" class="font-medium">Loading...</span> </div> <div class="flex justify-between"> <span class="text-primary-600">Amount:</span> <span id="amount" class="font-medium">Loading...</span> </div> <div class="flex justify-between"> <span class="text-primary-600">Status:</span> <span class="font-medium text-success-600">Completed</span> </div> </div> </div> </div> <!-- What's Next --> <div class="bg-secondary-50 rounded-lg p-6 mb-8"> <h3 class="font-semibold text-primary-900 mb-4">What's Next?</h3> <div class="space-y-3 text-left"> <div class="flex items-start"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path> </svg> <div> <p class="font-medium">Confirmation Email</p> <p class="text-sm text-primary-600">You'll receive a confirmation email with your order details shortly.</p> </div> </div> <div class="flex items-start"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path> </svg> <div> <p class="font-medium">Processing & Roasting</p> <p class="text-sm text-primary-600">Your coffee will be freshly roasted and prepared for shipping within 24 hours.</p> </div> </div> <div class="flex items-start"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4M5 9h14l1 12H4L5 9z"></path> </svg> <div> <p class="font-medium">Shipping</p> <p class="text-sm text-primary-600">Your order will be shipped within 2-3 business days with tracking information.</p> </div> </div> </div> </div> <!-- Action Buttons --> <div class="flex flex-col sm:flex-row gap-4 justify-center"> <a href="/dashboard" class="btn-primary">
View Dashboard
</a> <a href="/shop" class="btn-outline">
Continue Shopping
</a> </div> <!-- Support --> <div class="mt-8 pt-6 border-t border-primary-200"> <p class="text-sm text-primary-600">
Questions about your order?
<a href="/contact" class="text-primary-800 hover:text-primary-600 underline">Contact our support team</a> </p> </div> </div> </div> </section> </div> <div id="error-content" class="hidden"> <section class="min-h-screen bg-primary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"> <div class="max-w-2xl w-full"> <div class="bg-white rounded-lg shadow-medium p-8 text-center"> <!-- Error Icon --> <div class="w-20 h-20 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-6"> <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-error-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> <h1 class="text-3xl font-bold text-primary-900 mb-4">Unable to Confirm Purchase</h1> <p class="text-lg text-primary-700 mb-8">
We're having trouble confirming your purchase details. Don't worry - if your payment went through, 
            you'll receive a confirmation email shortly.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center"> <a href="/dashboard" class="btn-primary">
Go to Dashboard
</a> <a href="/contact" class="btn-outline">
Contact Support
</a> </div> </div> </div> </section> </div> ` })} ${renderScript($$result, "/home/project/src/pages/success.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/project/src/pages/success.astro", void 0);

const $$file = "/home/project/src/pages/success.astro";
const $$url = "/success";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Success,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
