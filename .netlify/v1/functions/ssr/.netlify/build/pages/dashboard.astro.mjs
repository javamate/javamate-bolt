/* empty css                                */
import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_w5nKfbD5.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_DwEFYE8d.mjs';
export { renderers } from '../renderers.mjs';

const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Dashboard", "description": "Manage your Javamate Coffee account and orders" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="auth-loading" class="min-h-screen bg-primary-50 flex items-center justify-center"> <div class="text-center"> <div class="coffee-loader mb-4"></div> <p class="text-primary-600">Loading your dashboard...</p> </div> </div> <div id="dashboard-content" class="hidden"> <section class="bg-primary-900 text-white py-16 md:py-24"> <div class="container-custom"> <div class="max-w-3xl mx-auto text-center"> <h1 class="mb-4 animate-fade-in">Welcome back!</h1> <p class="text-lg text-primary-100 animate-slide-up" style="animation-delay: 0.2s;">
Manage your account, view your orders, and discover new coffees.
</p> </div> </div> </section> <section class="section bg-white"> <div class="container-custom"> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <!-- User Info --> <div class="lg:col-span-1"> <div class="card p-6 sticky top-24"> <div class="text-center mb-6"> <div class="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"> <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path> </svg> </div> <h3 class="text-xl font-semibold mb-2" id="user-email">Loading...</h3> <p class="text-primary-600">Coffee Enthusiast</p> </div> <!-- Subscription Status --> <div id="subscription-status" class="mb-6"> <h4 class="font-semibold mb-3">Subscription Status</h4> <div id="subscription-info" class="p-4 bg-primary-50 rounded-lg"> <p class="text-sm text-primary-600">Loading subscription information...</p> </div> </div> <!-- Quick Actions --> <div class="space-y-3"> <a href="/shop" class="btn-primary w-full text-center">Browse Coffee</a> <a href="/cart" class="btn-outline w-full text-center">View Cart</a> <button id="logout-button" class="btn-outline w-full text-error-600 border-error-600 hover:bg-error-50">
Sign Out
</button> </div> </div> </div> <!-- Main Content --> <div class="lg:col-span-2 space-y-8"> <!-- Available Products --> <div class="card p-6"> <h3 class="text-2xl font-semibold mb-6">Available Products</h3> <div id="products-list" class="space-y-4"> <div class="text-center py-8"> <div class="coffee-loader mb-4"></div> <p class="text-primary-600">Loading products...</p> </div> </div> </div> <!-- Recent Orders --> <div class="card p-6"> <div class="flex items-center justify-between mb-6"> <h3 class="text-2xl font-semibold">Recent Orders</h3> <a href="/orders" class="text-primary-600 hover:text-primary-800 text-sm font-medium">
View All Orders
</a> </div> <div id="orders-list"> <div class="text-center py-8"> <div class="coffee-loader mb-4"></div> <p class="text-primary-600">Loading orders...</p> </div> </div> </div> </div> </div> </div> </section> </div>  <div id="loading-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"> <div class="bg-white rounded-lg p-8 max-w-sm w-full mx-4"> <div class="text-center"> <div class="coffee-loader mb-4"></div> <h3 class="text-lg font-semibold mb-2">Processing...</h3> <p class="text-primary-600" id="loading-message">Please wait while we process your request.</p> </div> </div> </div> ` })} ${renderScript($$result, "/home/project/src/pages/dashboard.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/project/src/pages/dashboard.astro", void 0);

const $$file = "/home/project/src/pages/dashboard.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
