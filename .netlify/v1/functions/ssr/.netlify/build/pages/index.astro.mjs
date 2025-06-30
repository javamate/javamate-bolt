/* empty css                                */
import { e as createComponent, m as maybeRenderHead, r as renderTemplate, f as createAstro, h as addAttribute, l as renderScript, k as renderComponent } from '../chunks/astro/server_w5nKfbD5.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_DwEFYE8d.mjs';
import 'clsx';
import { g as getCrystallizeProducts } from '../chunks/crystallize_YFi5Y__O.mjs';
export { renderers } from '../renderers.mjs';

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="relative overflow-hidden bg-primary-900 text-white"> <!-- Background image with overlay --> <div class="absolute inset-0 bg-black opacity-50 z-10"></div> <div class="absolute inset-0 z-0"> <img src="https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg" alt="Coffee beans being roasted" class="w-full h-full object-cover" fetchpriority="high"> </div> <div class="container-custom relative z-20 py-20 md:py-32 lg:py-40"> <div class="max-w-3xl"> <h1 class="mb-6 animate-fade-in">
Exceptional Coffee, <br> <span class="text-secondary-400">Expertly Roasted</span> </h1> <p class="text-xl md:text-2xl mb-8 text-gray-100 animate-slide-up" style="animation-delay: 0.2s;">
Small-batch specialty coffee, freshly roasted and delivered to your door.
</p> <div class="flex flex-wrap gap-4 animate-slide-up" style="animation-delay: 0.4s;"> <a href="/shop" class="btn-primary">Shop Now</a> <a href="/about" class="btn bg-transparent border-2 border-white text-white hover:bg-white/10 focus:ring-white">
Our Story
</a> </div> </div> </div> <!-- Decorative coffee bean shape --> <div class="hidden lg:block absolute -right-20 -bottom-20 w-96 h-96 bg-primary-800/30 rounded-full blur-3xl"></div> </section>`;
}, "/home/project/src/components/Hero.astro", void 0);

const $$Astro = createAstro();
const $$FeaturedProducts = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FeaturedProducts;
  const { products = [] } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 reveal"> ${products.map((product) => renderTemplate`<div class="card group"> <div class="relative overflow-hidden"> <img${addAttribute(product.fields.featuredImage?.fields.file.url || "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg", "src")}${addAttribute(product.fields.title, "alt")} class="w-full aspect-square object-cover transform group-hover:scale-105 transition-transform duration-500"> ${product.fields.isNew && renderTemplate`<div class="absolute top-4 left-4 bg-accent-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
New
</div>`} </div> <div class="p-6"> <h3 class="text-xl mb-2">${product.fields.title}</h3> <p class="text-primary-700 mb-2 line-clamp-2">${product.fields.shortDescription}</p> <div class="flex items-center justify-between mt-4"> <span class="text-lg font-semibold">$${product.fields.price.toFixed(2)}</span> <a${addAttribute(`/product/${product.fields.slug}`, "href")} class="btn-primary py-2 px-4">View</a> </div> </div> </div>`)} </div> <!-- Fallback in case no products are available --> ${products.length === 0 && renderTemplate`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 reveal"> ${Array.from({ length: 4 }).map((_, i) => renderTemplate`<div class="card group"> <div class="relative overflow-hidden"> <img${addAttribute(`https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=format&w=800&h=800`, "src")} alt="Coffee beans" class="w-full aspect-square object-cover transform group-hover:scale-105 transition-transform duration-500"> ${i === 0 && renderTemplate`<div class="absolute top-4 left-4 bg-accent-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
New
</div>`} </div> <div class="p-6"> <h3 class="text-xl mb-2"> ${i === 0 ? "Ethiopian Yirgacheffe" : i === 1 ? "Colombian Supremo" : i === 2 ? "Guatemala Antigua" : "Sumatra Mandheling"} </h3> <p class="text-primary-700 mb-2 line-clamp-2"> ${i === 0 ? "Bright and fruity with notes of bergamot and lemon." : i === 1 ? "Sweet and balanced with notes of caramel and chocolate." : i === 2 ? "Rich and complex with notes of cocoa and spice." : "Bold and earthy with notes of cedar and herbs."} </p> <div class="flex items-center justify-between mt-4"> <span class="text-lg font-semibold">$${(14.99 + i).toFixed(2)}</span> <a href="/shop" class="btn-primary py-2 px-4">View</a> </div> </div> </div>`)} </div>`}`;
}, "/home/project/src/components/FeaturedProducts.astro", void 0);

const $$Story = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="section bg-primary-50"> <div class="container-custom"> <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"> <div class="reveal"> <h2 class="mb-4">Our Story</h2> <p class="text-lg text-primary-800 mb-6">
Javamate Coffee Roasters was born from a simple passion: creating exceptionally delicious coffee while making a positive impact on the world.
</p> <p class="mb-6">
Founded in 2020 by coffee enthusiasts Sarah and Michael, Javamate began as a small roastery focused on quality and sustainability. We travel the world to find the best coffee beans, build relationships with farmers, and ensure fair prices for their incredible work.
</p> <p class="mb-8">
Today, our mission remains the same: to deliver freshly roasted, ethically sourced specialty coffee directly to your door, while supporting the communities who grow it.
</p> <a href="/about" class="btn-outline">Learn More About Us</a> </div> <div class="relative reveal"> <img src="https://images.pexels.com/photos/6113376/pexels-photo-6113376.jpeg" alt="Coffee roaster checking beans" class="w-full h-auto rounded-lg shadow-medium object-cover"> <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary-500 rounded-lg -z-10"></div> <div class="absolute -top-6 -right-6 w-32 h-32 bg-primary-400 rounded-lg -z-10"></div> </div> </div> </div> </section>`;
}, "/home/project/src/components/Story.astro", void 0);

const $$Process = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="section bg-white"> <div class="container-custom"> <div class="max-w-3xl mx-auto text-center mb-16 reveal"> <h2 class="mb-4">From Bean to Cup</h2> <p class="text-lg text-primary-800">
Great coffee doesn't happen by accident. We carefully control every step of the process to ensure exceptional quality in every cup.
</p> </div> <div class="relative"> <!-- Connection line --> <div class="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary-200 -translate-y-1/2 z-0"></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10"> <div class="card p-6 text-center reveal" style="--reveal-delay: 0.1s"> <div class="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white"> <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> <h3 class="text-xl mb-2">Source</h3> <p class="text-primary-700">We carefully select the finest beans from around the world, ensuring they are ethically sourced.</p> </div> <div class="card p-6 text-center reveal" style="--reveal-delay: 0.2s"> <div class="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white"> <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path> </svg> </div> <h3 class="text-xl mb-2">Roast</h3> <p class="text-primary-700">Each batch is roasted with precision to bring out the unique flavor profile of the beans.</p> </div> <div class="card p-6 text-center reveal" style="--reveal-delay: 0.3s"> <div class="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white"> <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path> </svg> </div> <h3 class="text-xl mb-2">Package</h3> <p class="text-primary-700">We pack and ship within 24 hours of roasting to ensure maximum freshness.</p> </div> <div class="card p-6 text-center reveal" style="--reveal-delay: 0.4s"> <div class="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white"> <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> <h3 class="text-xl mb-2">Deliver</h3> <p class="text-primary-700">Your coffee arrives at peak freshness, ready to be enjoyed in your favorite brewing method.</p> </div> </div> </div> </div> </section>`;
}, "/home/project/src/components/Process.astro", void 0);

const $$Testimonials = createComponent(($$result, $$props, $$slots) => {
  const testimonials = [
    {
      quote: "The Ethiopian Yirgacheffe is out of this world! The bright, fruity flavors make it my favorite morning coffee.",
      author: "Sarah M.",
      location: "Portland, OR"
    },
    {
      quote: "I've tried countless coffee subscriptions, but Javamate consistently delivers the best beans I've ever had.",
      author: "Michael T.",
      location: "Chicago, IL"
    },
    {
      quote: "Not only is the coffee exceptional, but I love knowing it's ethically sourced. Makes each cup that much better.",
      author: "Amara K.",
      location: "Austin, TX"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="section bg-primary-900 text-white"> <div class="container-custom"> <div class="max-w-3xl mx-auto text-center mb-12 reveal"> <h2 class="mb-4">What Our Customers Say</h2> <p class="text-lg text-primary-100">
Don't just take our word for it. Here's what coffee lovers have to say about Javamate.
</p> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8 reveal"> ${testimonials.map((testimonial, index) => renderTemplate`<div class="bg-primary-800 p-8 rounded-lg relative"> <!-- Quote icon --> <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary-500 absolute -top-4 -left-4 opacity-30" fill="currentColor" viewBox="0 0 24 24"> <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z"></path> </svg> <p class="mb-6 text-primary-100 relative z-10">${testimonial.quote}</p> <div class="flex items-center"> <div class="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center mr-3"> <span class="text-white font-semibold">${testimonial.author.charAt(0)}</span> </div> <div> <h4 class="font-semibold">${testimonial.author}</h4> <p class="text-sm text-primary-300">${testimonial.location}</p> </div> </div> </div>`)} </div> </div> </section>`;
}, "/home/project/src/components/Testimonials.astro", void 0);

const $$Newsletter = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="bg-secondary-100 py-16"> <div class="container-custom"> <div class="max-w-3xl mx-auto text-center reveal"> <h2 class="mb-4">Join Our Coffee Community</h2> <p class="text-lg text-primary-800 mb-8">
Subscribe to our newsletter for brewing tips, special offers, and first access to new releases.
</p> <form id="newsletter-form" class="max-w-md mx-auto"> <div class="flex"> <input type="email" id="newsletter-email" name="email" placeholder="Your email address" class="form-input rounded-r-none flex-grow" required> <button type="submit" class="btn-primary rounded-l-none" id="newsletter-submit"> <span id="newsletter-text">Subscribe</span> <div id="newsletter-loading" class="hidden flex items-center"> <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg>
Subscribing...
</div> </button> </div> <p class="text-sm text-primary-600 mt-2">We respect your privacy and will never share your information.</p> <!-- Success Message --> <div id="newsletter-success" class="hidden mt-4 p-4 bg-success-100 text-success-700 rounded-md"> <div class="flex items-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg>
Thank you for subscribing! You'll receive our latest updates and special offers.
</div> </div> <!-- Error Message --> <div id="newsletter-error" class="hidden mt-4 p-4 bg-error-100 text-error-700 rounded-md"> <div class="flex items-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <span id="newsletter-error-message">There was an error subscribing. Please try again.</span> </div> </div> </form> </div> </div> </section> ${renderScript($$result, "/home/project/src/components/Newsletter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/project/src/components/Newsletter.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const allProducts = await getCrystallizeProducts({ limit: 10 });
  const featuredProducts = allProducts.filter((product) => product.fields.featured);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Fresh Roasted Coffee | Javamate Coffee Roasters" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, {})} ${maybeRenderHead()}<section class="section bg-white"> <div class="container-custom"> <h2 class="text-center mb-12 reveal">Featured Coffees</h2> ${renderComponent($$result2, "FeaturedProducts", $$FeaturedProducts, { "products": featuredProducts })} <div class="text-center mt-12"> <a href="/shop" class="btn-primary">Shop All Coffees</a> </div> </div> </section> ${renderComponent($$result2, "Story", $$Story, {})} ${renderComponent($$result2, "Process", $$Process, {})} <section class="section bg-primary-50"> <div class="container-custom"> <div class="max-w-3xl mx-auto text-center mb-12 reveal"> <h2 class="mb-4">Why Choose Javamate?</h2> <p class="text-lg text-primary-800">We're passionate about great coffee and believe in doing things right, from seed to cup.</p> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8 reveal"> <div class="card p-8 text-center"> <div class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path> </svg> </div> <h3 class="text-xl mb-2">Freshly Roasted</h3> <p class="text-primary-700">We roast to order to ensure the freshest coffee possible, shipped within 24 hours of roasting.</p> </div> <div class="card p-8 text-center"> <div class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m-9 9a9 9 0 019-9"></path> </svg> </div> <h3 class="text-xl mb-2">Ethically Sourced</h3> <p class="text-primary-700">We source from farmers who are paid fairly and practice sustainable agriculture.</p> </div> <div class="card p-8 text-center"> <div class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path> </svg> </div> <h3 class="text-xl mb-2">Quality Guaranteed</h3> <p class="text-primary-700">If you're not satisfied with your coffee, we'll replace it or refund your purchase.</p> </div> </div> </div> </section> ${renderComponent($$result2, "Testimonials", $$Testimonials, {})} ${renderComponent($$result2, "Newsletter", $$Newsletter, {})} ` })}`;
}, "/home/project/src/pages/index.astro", void 0);

const $$file = "/home/project/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
