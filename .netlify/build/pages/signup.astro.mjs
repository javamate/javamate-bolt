/* empty css                                */
import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_w5nKfbD5.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_DwEFYE8d.mjs';
export { renderers } from '../renderers.mjs';

const $$Signup = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sign Up", "description": "Create your Javamate Coffee account" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="min-h-screen bg-primary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"> <div class="max-w-md w-full space-y-8"> <div class="text-center"> <a href="/" class="flex items-center justify-center space-x-2 mb-8"> <img src="/images/logo.svg" alt="Javamate Coffee Roasters" width="40" height="40" class="w-10 h-10"> <span class="font-serif font-bold text-xl text-primary-900">Javamate</span> </a> <h1 class="text-3xl font-bold text-primary-900 mb-2">Create your account</h1> <p class="text-primary-600">Join the Javamate community today</p> </div> <div class="bg-white rounded-lg shadow-medium p-8"> <form id="signup-form" class="space-y-6"> <div> <label for="email" class="form-label">Email address</label> <input id="email" name="email" type="email" autocomplete="email" required class="form-input" placeholder="Enter your email"> </div> <div> <label for="password" class="form-label">Password</label> <input id="password" name="password" type="password" autocomplete="new-password" required class="form-input" placeholder="Create a password"> <p class="mt-1 text-sm text-primary-600">
Password must be at least 8 characters long
</p> </div> <div> <label for="confirm-password" class="form-label">Confirm password</label> <input id="confirm-password" name="confirm-password" type="password" autocomplete="new-password" required class="form-input" placeholder="Confirm your password"> </div> <div class="flex items-center"> <input id="terms" name="terms" type="checkbox" required class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"> <label for="terms" class="ml-2 block text-sm text-primary-700">
I agree to the <a href="/terms" class="text-primary-600 hover:text-primary-500 underline">Terms of Service</a>
and <a href="/privacy" class="text-primary-600 hover:text-primary-500 underline">Privacy Policy</a> </label> </div> <div> <button type="submit" class="btn-primary w-full py-3 text-lg" id="signup-button">
Create account
</button> </div> <div id="signup-message" class="hidden p-4 rounded-md"></div> </form> <div class="mt-6"> <div class="relative"> <div class="absolute inset-0 flex items-center"> <div class="w-full border-t border-gray-300"></div> </div> <div class="relative flex justify-center text-sm"> <span class="px-2 bg-white text-gray-500">Already have an account?</span> </div> </div> <div class="mt-6"> <a href="/login" class="btn-outline w-full text-center py-3">
Sign in instead
</a> </div> </div> </div> </div> </section> ` })} ${renderScript($$result, "/home/project/src/pages/signup.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/project/src/pages/signup.astro", void 0);

const $$file = "/home/project/src/pages/signup.astro";
const $$url = "/signup";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Signup,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
