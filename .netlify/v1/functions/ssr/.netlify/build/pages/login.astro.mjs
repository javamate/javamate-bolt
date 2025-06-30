/* empty css                                */
import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_w5nKfbD5.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_DwEFYE8d.mjs';
export { renderers } from '../renderers.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Login", "description": "Sign in to your Javamate Coffee account" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="min-h-screen bg-primary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"> <div class="max-w-md w-full space-y-8"> <div class="text-center"> <a href="/" class="flex items-center justify-center space-x-2 mb-8"> <img src="/images/logo.svg" alt="Javamate Coffee Roasters" width="40" height="40" class="w-10 h-10"> <span class="font-serif font-bold text-xl text-primary-900">Javamate</span> </a> <h1 class="text-3xl font-bold text-primary-900 mb-2">Welcome back</h1> <p class="text-primary-600">Sign in to your account to continue</p> </div> <div class="bg-white rounded-lg shadow-medium p-8"> <form id="login-form" class="space-y-6"> <div> <label for="email" class="form-label">Email address</label> <input id="email" name="email" type="email" autocomplete="email" required class="form-input" placeholder="Enter your email"> </div> <div> <label for="password" class="form-label">Password</label> <input id="password" name="password" type="password" autocomplete="current-password" required class="form-input" placeholder="Enter your password"> </div> <div class="flex items-center justify-between"> <div class="flex items-center"> <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"> <label for="remember-me" class="ml-2 block text-sm text-primary-700">
Remember me
</label> </div> <div class="text-sm"> <a href="/forgot-password" class="font-medium text-primary-600 hover:text-primary-500">
Forgot your password?
</a> </div> </div> <div> <button type="submit" class="btn-primary w-full py-3 text-lg" id="login-button">
Sign in
</button> </div> <div id="login-message" class="hidden p-4 rounded-md"></div> </form> <div class="mt-6"> <div class="relative"> <div class="absolute inset-0 flex items-center"> <div class="w-full border-t border-gray-300"></div> </div> <div class="relative flex justify-center text-sm"> <span class="px-2 bg-white text-gray-500">Don't have an account?</span> </div> </div> <div class="mt-6"> <a href="/signup" class="btn-outline w-full text-center py-3">
Create new account
</a> </div> </div> </div> </div> </section> ` })} ${renderScript($$result, "/home/project/src/pages/login.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/project/src/pages/login.astro", void 0);

const $$file = "/home/project/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
