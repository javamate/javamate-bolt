/* empty css                                */
import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_w5nKfbD5.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_DwEFYE8d.mjs';
export { renderers } from '../renderers.mjs';

const $$Orders = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Order History", "description": "View all your orders and their details" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="auth-loading" class="min-h-screen bg-primary-50 flex items-center justify-center"> <div class="text-center"> <div class="coffee-loader mb-4"></div> <p class="text-primary-600">Loading your orders...</p> </div> </div> <div id="orders-content" class="hidden"> <section class="bg-primary-900 text-white py-16 md:py-24"> <div class="container-custom"> <div class="max-w-3xl mx-auto text-center"> <h1 class="mb-4 animate-fade-in">Order History</h1> <p class="text-lg text-primary-100 animate-slide-up" style="animation-delay: 0.2s;">
View all your orders and track their status
</p> </div> </div> </section> <section class="section bg-white"> <div class="container-custom"> <div class="max-w-4xl mx-auto"> <!-- Breadcrumb --> <nav class="mb-8"> <ol class="flex items-center space-x-2 text-sm text-primary-600"> <li><a href="/" class="hover:text-primary-800">Home</a></li> <li><span class="mx-2">/</span></li> <li><a href="/dashboard" class="hover:text-primary-800">Dashboard</a></li> <li><span class="mx-2">/</span></li> <li class="text-primary-900">Orders</li> </ol> </nav> <!-- Filter and Sort --> <div class="card p-6 mb-8"> <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"> <div class="flex items-center space-x-4"> <select id="status-filter" class="form-input max-w-xs"> <option value="">All Statuses</option> <option value="completed">Completed</option> <option value="pending">Pending</option> <option value="canceled">Canceled</option> </select> <select id="date-filter" class="form-input max-w-xs"> <option value="">All Time</option> <option value="30">Last 30 Days</option> <option value="90">Last 3 Months</option> <option value="365">Last Year</option> </select> </div> <div class="text-sm text-primary-600"> <span id="order-count">Loading...</span> orders found
</div> </div> </div> <!-- Orders List --> <div id="orders-list"> <div class="text-center py-16"> <div class="coffee-loader mb-4"></div> <p class="text-primary-600">Loading your orders...</p> </div> </div> <!-- Pagination --> <div id="pagination" class="hidden mt-8 flex justify-center"> <nav class="flex items-center space-x-2"> <button id="prev-page" class="btn-outline py-2 px-4 text-sm" disabled>
Previous
</button> <span id="page-info" class="px-4 py-2 text-sm text-primary-600">
Page 1 of 1
</span> <button id="next-page" class="btn-outline py-2 px-4 text-sm" disabled>
Next
</button> </nav> </div> <!-- Back to Dashboard --> <div class="mt-8"> <a href="/dashboard" class="btn-outline"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg>
Back to Dashboard
</a> </div> </div> </div> </section> </div> ` })} ${renderScript($$result, "/home/project/src/pages/orders.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/project/src/pages/orders.astro", void 0);

const $$file = "/home/project/src/pages/orders.astro";
const $$url = "/orders";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Orders,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
