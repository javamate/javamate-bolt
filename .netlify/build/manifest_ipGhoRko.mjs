import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { q as NOOP_MIDDLEWARE_HEADER, v as decodeKey } from './chunks/astro/server_w5nKfbD5.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/project/","cacheDir":"file:///home/project/node_modules/.astro/","outDir":"file:///home/project/dist/","srcDir":"file:///home/project/src/","publicDir":"file:///home/project/public/","buildClientDir":"file:///home/project/dist/","buildServerDir":"file:///home/project/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/cart.DBN0SZA4.css"},{"type":"inline","content":".line-clamp-2[data-astro-cid-zetdm5md]{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.reveal[data-astro-cid-zetdm5md]{opacity:0;transform:translateY(20px);transition:opacity .6s ease-out,transform .6s ease-out;transition-delay:var(--reveal-delay, 0s)}.reveal[data-astro-cid-zetdm5md].active{opacity:1;transform:translateY(0)}\n"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/cart.DBN0SZA4.css"},{"type":"inline","content":".quantity-input[data-astro-cid-h3zw4u6d]::-webkit-outer-spin-button,.quantity-input[data-astro-cid-h3zw4u6d]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}.quantity-input[data-astro-cid-h3zw4u6d][type=number]{-moz-appearance:textfield}input[data-astro-cid-h3zw4u6d][type=radio]:checked+div[data-astro-cid-h3zw4u6d]{color:#7d5935}label[data-astro-cid-h3zw4u6d]:has(input[type=radio]:checked){border-color:#b78b5e;background-color:#faf6f1}\n"}],"routeData":{"route":"/cart","isIndex":false,"type":"page","pattern":"^\\/cart\\/?$","segments":[[{"content":"cart","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cart.astro","pathname":"/cart","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/cart.DBN0SZA4.css"}],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/cart.DBN0SZA4.css"}],"routeData":{"route":"/dashboard","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard.astro","pathname":"/dashboard","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/cart.DBN0SZA4.css"}],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/cart.DBN0SZA4.css"},{"type":"inline","content":"@media print{.btn-outline[data-astro-cid-iz3g3gzo],.btn-primary[data-astro-cid-iz3g3gzo],nav[data-astro-cid-iz3g3gzo],header[data-astro-cid-iz3g3gzo],footer[data-astro-cid-iz3g3gzo]{display:none!important}.card[data-astro-cid-iz3g3gzo]{box-shadow:none!important;border:1px solid #e5e7eb!important}.section[data-astro-cid-iz3g3gzo]{padding:1rem 0!important}.container-custom[data-astro-cid-iz3g3gzo]{padding:0 1rem!important}}\n"}],"routeData":{"route":"/order/[id]","isIndex":false,"type":"page","pattern":"^\\/order\\/([^/]+?)\\/?$","segments":[[{"content":"order","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/order/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/cart.DBN0SZA4.css"}],"routeData":{"route":"/orders","isIndex":false,"type":"page","pattern":"^\\/orders\\/?$","segments":[[{"content":"orders","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/orders.astro","pathname":"/orders","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/cart.DBN0SZA4.css"},{"type":"inline","content":".filter-btn[data-astro-cid-5w43p2qc]{border-radius:9999px;border-width:1px;--tw-border-opacity: 1;border-color:rgb(217 191 161 / var(--tw-border-opacity, 1));padding:.5rem 1rem;--tw-text-opacity: 1;color:rgb(125 89 53 / var(--tw-text-opacity, 1));transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.filter-btn[data-astro-cid-5w43p2qc]:hover{--tw-bg-opacity: 1;background-color:rgb(250 246 241 / var(--tw-bg-opacity, 1))}.filter-btn[data-astro-cid-5w43p2qc].active{--tw-border-opacity: 1;border-color:rgb(154 112 70 / var(--tw-border-opacity, 1));--tw-bg-opacity: 1;background-color:rgb(154 112 70 / var(--tw-bg-opacity, 1));--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.line-clamp-2[data-astro-cid-5w43p2qc]{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}\n"}],"routeData":{"route":"/shop","isIndex":false,"type":"page","pattern":"^\\/shop\\/?$","segments":[[{"content":"shop","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/shop.astro","pathname":"/shop","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/cart.DBN0SZA4.css"}],"routeData":{"route":"/signup","isIndex":false,"type":"page","pattern":"^\\/signup\\/?$","segments":[[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signup.astro","pathname":"/signup","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/cart.DBN0SZA4.css"}],"routeData":{"route":"/success","isIndex":false,"type":"page","pattern":"^\\/success\\/?$","segments":[[{"content":"success","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/success.astro","pathname":"/success","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/cart.DBN0SZA4.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/project/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/home/project/src/pages/cart.astro",{"propagation":"none","containsHead":true}],["/home/project/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/home/project/src/pages/dashboard.astro",{"propagation":"none","containsHead":true}],["/home/project/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/project/src/pages/login.astro",{"propagation":"none","containsHead":true}],["/home/project/src/pages/order/[id].astro",{"propagation":"none","containsHead":true}],["/home/project/src/pages/orders.astro",{"propagation":"none","containsHead":true}],["/home/project/src/pages/product/[slug].astro",{"propagation":"none","containsHead":true}],["/home/project/src/pages/shop.astro",{"propagation":"none","containsHead":true}],["/home/project/src/pages/signup.astro",{"propagation":"none","containsHead":true}],["/home/project/src/pages/success.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/cart@_@astro":"pages/cart.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/dashboard@_@astro":"pages/dashboard.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/order/[id]@_@astro":"pages/order/_id_.astro.mjs","\u0000@astro-page:src/pages/orders@_@astro":"pages/orders.astro.mjs","\u0000@astro-page:src/pages/product/[slug]@_@astro":"pages/product/_slug_.astro.mjs","\u0000@astro-page:src/pages/shop@_@astro":"pages/shop.astro.mjs","\u0000@astro-page:src/pages/signup@_@astro":"pages/signup.astro.mjs","\u0000@astro-page:src/pages/success@_@astro":"pages/success.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_ipGhoRko.mjs","/home/project/node_modules/astro/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","/home/project/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DyPmTVUG.mjs","@astrojs/react/client.js":"_astro/client.bnNPSdWK.js","/home/project/src/pages/cart.astro?astro&type=script&index=0&lang.ts":"_astro/cart.astro_astro_type_script_index_0_lang.BWnoJDS3.js","/home/project/src/pages/dashboard.astro?astro&type=script&index=0&lang.ts":"_astro/dashboard.astro_astro_type_script_index_0_lang.CrzDfSAU.js","/home/project/src/pages/login.astro?astro&type=script&index=0&lang.ts":"_astro/login.astro_astro_type_script_index_0_lang.D9lXnmpv.js","/home/project/src/pages/order/[id].astro?astro&type=script&index=0&lang.ts":"_astro/_id_.astro_astro_type_script_index_0_lang.BCLup3f_.js","/home/project/src/pages/orders.astro?astro&type=script&index=0&lang.ts":"_astro/orders.astro_astro_type_script_index_0_lang.OlrMMY-c.js","/home/project/src/pages/shop.astro?astro&type=script&index=0&lang.ts":"_astro/shop.astro_astro_type_script_index_0_lang.BUHreiKP.js","/home/project/src/pages/signup.astro?astro&type=script&index=0&lang.ts":"_astro/signup.astro_astro_type_script_index_0_lang.may4CI7g.js","/home/project/src/pages/success.astro?astro&type=script&index=0&lang.ts":"_astro/success.astro_astro_type_script_index_0_lang.cJIb3lXy.js","/home/project/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.DGG_EcyW.js","/home/project/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts":"_astro/Layout.astro_astro_type_script_index_1_lang.BUJGNhl6.js","/home/project/src/components/ContactForm.astro?astro&type=script&index=0&lang.ts":"_astro/ContactForm.astro_astro_type_script_index_0_lang.DkFZs4xG.js","/home/project/src/components/Newsletter.astro?astro&type=script&index=0&lang.ts":"_astro/Newsletter.astro_astro_type_script_index_0_lang.CFIr1aoo.js","/home/project/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.C4uoVnFn.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/home/project/src/pages/shop.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const d=document.querySelectorAll(\".filter-btn\"),c=document.getElementById(\"roast-filter\"),n=document.getElementById(\"sort-filter\"),o=document.getElementById(\"products-grid\"),i=document.getElementById(\"no-products\"),u=document.getElementById(\"clear-filters\");let t={category:\"all\",roast:\"\",sort:\"featured\"};d.forEach(r=>{r.addEventListener(\"click\",()=>{d.forEach(s=>s.classList.remove(\"active\")),r.classList.add(\"active\"),t.category=r.dataset.filter,l()})}),c.addEventListener(\"change\",r=>{t.roast=r.target.value,l()}),n.addEventListener(\"change\",r=>{t.sort=r.target.value,l()}),u.addEventListener(\"click\",()=>{t={category:\"all\",roast:\"\",sort:\"featured\"},d.forEach(r=>r.classList.remove(\"active\")),d[0].classList.add(\"active\"),c.value=\"\",n.value=\"featured\",l()});function l(){const r=Array.from(document.querySelectorAll(\".product-card\"));let s=[];r.forEach(e=>{let a=!0;t.category!==\"all\"&&(t.category===\"featured\"&&e.dataset.featured!==\"true\"||t.category===\"new\"&&e.dataset.new!==\"true\"||t.category!==\"featured\"&&t.category!==\"new\"&&e.dataset.origin!==t.category)&&(a=!1),t.roast&&e.dataset.roast!==t.roast&&(a=!1),a?(s.push(e),e.style.display=\"block\"):e.style.display=\"none\"}),t.sort&&s.length>0&&(s.sort((e,a)=>{switch(t.sort){case\"price-low\":return parseFloat(e.dataset.price)-parseFloat(a.dataset.price);case\"price-high\":return parseFloat(a.dataset.price)-parseFloat(e.dataset.price);case\"name\":return e.dataset.name.localeCompare(a.dataset.name);case\"featured\":default:return e.dataset.featured===\"true\"&&a.dataset.featured!==\"true\"?-1:a.dataset.featured===\"true\"&&e.dataset.featured!==\"true\"?1:e.dataset.name.localeCompare(a.dataset.name)}}),s.forEach(e=>{o.appendChild(e)})),s.length===0?(i.classList.remove(\"hidden\"),o.classList.add(\"hidden\")):(i.classList.add(\"hidden\"),o.classList.remove(\"hidden\"))}});"],["/home/project/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const h=document.getElementById(\"cart-count\");if(h){const e=localStorage.getItem(\"cartCount\")||\"0\";h.textContent=e}document.addEventListener(\"click\",e=>{if(e.target.closest(\".add-to-cart\")){e.preventDefault();const t=e.target.closest(\".add-to-cart\"),o=t.dataset.productId;let n={};const s=t.closest(\"form\");if(s){const a=new FormData(s),p=document.querySelector(\"h1\")?.textContent||\"Coffee\",r=document.getElementById(\"total-price\")||document.querySelector(\"[data-price]\"),d=r?parseFloat(r.textContent||r.dataset.price):0,l=parseInt(a.get(\"quantity\")||\"1\"),u=isNaN(d)?0:d/l,m=document.getElementById(\"main-image\")?.src||\"https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg\",c=a.get(\"size\")||\"12oz\",i=a.get(\"grind\")||\"whole-bean\";let w=null,x=null;if(window.variants&&window.variants.length>0){const f=window.variants.find(g=>g.size===c&&g.grind===i)||window.variants.find(g=>g.size===c)||window.variants[0];f&&(w=f.id,x=f.stripe_price_id)}n={productId:o,variantId:w,title:p,price:isNaN(u)?0:u,image:m,grind:i,size:c,quantity:l,stripePriceId:x}}else{const a=t.closest(\".card, .product-card\"),p=a?.querySelector(\"h3\")?.textContent||\"Coffee\";let r=\"$0.00\";const d=a?.querySelector(\".flex.items-center.justify-between\");if(d){const c=d.querySelector(\"span\");c&&c.textContent.includes(\"$\")&&(r=c.textContent)}if(r===\"$0.00\"){const c=a?.querySelectorAll(\"span\");if(c){for(const i of c)if(i.textContent.includes(\"$\")&&i.textContent.match(/\\$\\d+\\.\\d{2}/)){r=i.textContent;break}}}r.includes(\"From \")&&(r=r.replace(\"From \",\"\"));const l=parseFloat(r.replace(\"$\",\"\")),u=isNaN(l)?0:l,m=a?.querySelector(\"img\")?.src||\"https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg\";n={productId:o,variantId:null,title:p,price:u,image:m,grind:\"whole-bean\",size:\"12oz\",quantity:1,stripePriceId:null}}C(n),y(),v(n.quantity,n.size,n.grind);const S=t.textContent;t.textContent=\"Added!\",t.classList.add(\"bg-success-500\",\"hover:bg-success-600\"),setTimeout(()=>{t.textContent=S,t.classList.remove(\"bg-success-500\",\"hover:bg-success-600\")},1500)}});function C(e){try{let t=JSON.parse(localStorage.getItem(\"javamate-cart\")||\"[]\");const o=t.find(n=>n.productId===e.productId&&n.grind===e.grind&&n.size===e.size);o?o.quantity+=e.quantity:t.push({id:Date.now().toString(),...e}),localStorage.setItem(\"javamate-cart\",JSON.stringify(t))}catch(t){console.error(\"Error adding to cart:\",t)}}function y(){try{const t=JSON.parse(localStorage.getItem(\"javamate-cart\")||\"[]\").reduce((n,s)=>n+s.quantity,0),o=document.getElementById(\"cart-count\");o&&(o.textContent=t.toString(),localStorage.setItem(\"cartCount\",t.toString()))}catch(e){console.error(\"Error updating cart count:\",e)}}function v(e,t,o){const n=o===\"whole-bean\"?\"whole bean\":o,s=document.createElement(\"div\");s.innerHTML=`\n      <div class=\"flex items-center\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5 mr-2\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 13l4 4L19 7\" />\n        </svg>\n        Added ${e} ${t} ${n} to cart!\n      </div>\n    `,s.className=\"fixed top-24 right-8 bg-success-500 text-white py-3 px-6 rounded-lg shadow-lg z-50 animate-fade-in\",document.body.appendChild(s),setTimeout(()=>{s.remove()},3e3)}});"],["/home/project/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const c=document.querySelectorAll(\".reveal\"),a=new IntersectionObserver(e=>{e.forEach(t=>{if(t.isIntersecting){const n=t.target.style.getPropertyValue(\"--reveal-delay\")||\"0s\";t.target.style.transitionDelay=n,t.target.classList.add(\"active\"),a.unobserve(t.target)}})},{threshold:.1,rootMargin:\"0px 0px -50px 0px\"});c.forEach(e=>{a.observe(e)}),document.querySelectorAll(\".product-card\").forEach(e=>{e.addEventListener(\"mouseenter\",()=>{const t=e.querySelector(\"img\");t&&(t.style.transform=\"scale(1.05)\")}),e.addEventListener(\"mouseleave\",()=>{const t=e.querySelector(\"img\");t&&(t.style.transform=\"scale(1)\")})});const s=document.querySelectorAll(\".add-to-cart\"),r=document.getElementById(\"cart-count\");if(s.length>0&&r){let e=parseInt(localStorage.getItem(\"cartCount\")||\"0\");r.textContent=e.toString(),s.forEach(t=>{t.addEventListener(\"click\",n=>{n.preventDefault(),e++,r.textContent=e.toString(),localStorage.setItem(\"cartCount\",e.toString());const o=document.createElement(\"div\");o.textContent=\"Added to cart!\",o.className=\"fixed top-24 right-8 bg-success-500 text-white py-2 px-4 rounded-lg shadow-md z-50 animate-fade-in\",document.body.appendChild(o),setTimeout(()=>{o.remove()},2e3)})})}});"]],"assets":["/_astro/cart.DBN0SZA4.css","/favicon.svg","/_astro/ContactForm.astro_astro_type_script_index_0_lang.DkFZs4xG.js","/_astro/Header.astro_astro_type_script_index_0_lang.C4uoVnFn.js","/_astro/Newsletter.astro_astro_type_script_index_0_lang.CFIr1aoo.js","/_astro/_id_.astro_astro_type_script_index_0_lang.BCLup3f_.js","/_astro/cart.astro_astro_type_script_index_0_lang.BWnoJDS3.js","/_astro/client.bnNPSdWK.js","/_astro/dashboard.astro_astro_type_script_index_0_lang.CrzDfSAU.js","/_astro/index.Ca8eImtd.js","/_astro/login.astro_astro_type_script_index_0_lang.D9lXnmpv.js","/_astro/orders.astro_astro_type_script_index_0_lang.OlrMMY-c.js","/_astro/signup.astro_astro_type_script_index_0_lang.may4CI7g.js","/_astro/success.astro_astro_type_script_index_0_lang.cJIb3lXy.js","/images/logo-white.svg","/images/logo.svg"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"GkZVKfQDuoig6khcMXr24/RcKzsVan0VO09zB7SD6R4=","sessionConfig":{"driver":"fs-lite","options":{"base":"/home/project/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
