# Javamate Coffee Roasters

A modern, full-stack e-commerce platform for specialty coffee built with Astro, React, and Supabase. This application demonstrates advanced web development practices with seamless integrations for content management, payments, and order fulfillment.

## 🚀 Live Demo

Visit the live application: [Javamate Coffee Roasters](https://your-domain.com)

## ✨ Key Features

### 🛍️ E-commerce Functionality
- **Product Catalog**: Dynamic product listings with filtering and sorting capabilities
- **Shopping Cart**: Persistent cart with local storage and real-time updates
- **Checkout Process**: Secure Stripe integration with shipping address collection
- **Order Management**: Complete order tracking and history for authenticated users

**Code References:**
- Product catalog: [`src/pages/shop.astro`](src/pages/shop.astro)
- Shopping cart: [`src/pages/cart.astro`](src/pages/cart.astro) and [`src/scripts/cart.js`](src/scripts/cart.js)
- Checkout integration: [`supabase/functions/stripe-checkout/index.ts`](supabase/functions/stripe-checkout/index.ts)

### 🔐 Authentication & User Management
- **Supabase Auth**: Email/password authentication with secure session management
- **User Dashboard**: Personalized dashboard with order history and subscription status
- **Protected Routes**: Client-side route protection for authenticated content

**Code References:**
- Authentication pages: [`src/pages/login.astro`](src/pages/login.astro), [`src/pages/signup.astro`](src/pages/signup.astro)
- User dashboard: [`src/pages/dashboard.astro`](src/pages/dashboard.astro)
- Auth integration: [`src/components/Header.astro`](src/components/Header.astro)

### 💳 Payment Processing
- **Stripe Integration**: Secure payment processing with webhook handling
- **Subscription Support**: Recurring payment capabilities for coffee subscriptions
- **Order Tracking**: Real-time order status updates via Stripe webhooks

**Code References:**
- Stripe configuration: [`src/stripe-config.ts`](src/stripe-config.ts)
- Webhook handler: [`supabase/functions/stripe-webhook/index.ts`](supabase/functions/stripe-webhook/index.ts)
- Database schema: [`supabase/migrations/20250629032549_wandering_meadow.sql`](supabase/migrations/20250629032549_wandering_meadow.sql)

### 📦 Content Management
- **Crystallize CMS**: Headless CMS integration for product management
- **Dynamic Content**: Real-time product data with fallback demo content
- **Image Management**: Optimized image delivery with responsive design

**Code References:**
- Crystallize integration: [`src/lib/crystallize.js`](src/lib/crystallize.js)
- Content fallback: [`src/lib/contentful.js`](src/lib/contentful.js)
- Product pages: [`src/pages/product/[slug].astro`](src/pages/product/[slug].astro)

### 📧 Communication Features
- **Contact Forms**: Dynamic contact form with email delivery
- **Newsletter Subscription**: Email list management with MailerSend integration
- **Order Notifications**: Automated email confirmations and updates

**Code References:**
- Contact form: [`src/components/ContactForm.astro`](src/components/ContactForm.astro)
- Email functions: [`supabase/functions/send-contact-email/index.ts`](supabase/functions/send-contact-email/index.ts)
- Newsletter: [`supabase/functions/newsletter-subscribe/index.ts`](supabase/functions/newsletter-subscribe/index.ts)

### 🎨 User Experience
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Interactive Animations**: GSAP-powered animations and micro-interactions
- **Progressive Enhancement**: Works without JavaScript, enhanced with it
- **Accessibility**: WCAG compliant with proper semantic markup

**Code References:**
- Styling system: [`src/styles/global.css`](src/styles/global.css), [`tailwind.config.mjs`](tailwind.config.mjs)
- Animations: [`src/scripts/animations.js`](src/scripts/animations.js)
- Layout components: [`src/layouts/Layout.astro`](src/layouts/Layout.astro)

## 🛠️ Technology Stack

### Frontend Framework
- **[Astro](https://astro.build/)** - Static site generator with islands architecture
- **[React](https://reactjs.org/)** - Interactive components and state management
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Tailwind Forms](https://github.com/tailwindlabs/tailwindcss-forms)** - Form styling plugin
- **[GSAP](https://greensock.com/gsap/)** - Animation library

### Backend & Database
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service with PostgreSQL
- **[Supabase Auth](https://supabase.com/auth)** - Authentication and user management
- **[Supabase Edge Functions](https://supabase.com/edge-functions)** - Serverless functions

### Payment Processing
- **[Stripe](https://stripe.com/)** - Payment processing and subscription management
- **[Stripe Checkout](https://stripe.com/payments/checkout)** - Hosted checkout experience
- **[Stripe Webhooks](https://stripe.com/docs/webhooks)** - Real-time payment notifications

### Content Management
- **[Crystallize](https://crystallize.com/)** - Headless e-commerce CMS
- **[Contentful](https://www.contentful.com/)** - Content management (legacy support)

### Email Services
- **[MailerSend](https://www.mailersend.com/)** - Transactional email delivery

### Deployment & Hosting
- **[Netlify](https://www.netlify.com/)** - Static site hosting with edge functions
- **[Netlify Edge Functions](https://docs.netlify.com/edge-functions/overview/)** - Serverless compute

## 🏗️ Architecture

### Islands Architecture
The application uses Astro's islands architecture for optimal performance:
- Static HTML generation for fast initial loads
- Selective hydration for interactive components
- Minimal JavaScript bundle sizes

### Database Design
PostgreSQL database with the following key tables:
- `stripe_customers` - User-to-Stripe customer mapping
- `stripe_subscriptions` - Subscription management
- `stripe_orders` - Order tracking and history
- Row Level Security (RLS) for data protection

### API Integration Pattern
```typescript
// Example: Crystallize product fetching
export async function getCrystallizeProducts(options = {}) {
  try {
    const response = await client.catalogueApi(query, variables);
    return transformProducts(response.data);
  } catch (error) {
    return getDemoProducts(); // Graceful fallback
  }
}
```

## 🔧 Key Integrations

### Stripe Payment Flow
1. **Product Selection**: Users add items to cart with variant selection
2. **Checkout Creation**: Supabase Edge Function creates Stripe checkout session
3. **Payment Processing**: Stripe handles secure payment collection
4. **Webhook Processing**: Order data synchronized to database
5. **Order Fulfillment**: Integration with Crystallize for order management

### Crystallize CMS Integration
- **Product Management**: Dynamic product catalog with variants
- **Order Synchronization**: Automatic order creation in Crystallize
- **Inventory Management**: Real-time stock and pricing updates

### Email Automation
- **Contact Forms**: Instant notification delivery via MailerSend
- **Order Confirmations**: Automated email receipts
- **Newsletter Management**: Subscription handling with double opt-in

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account
- Crystallize account (optional)
- MailerSend account (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd javamate-coffee-roasters
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Configure the following environment variables:
   ```env
   # Supabase
   PUBLIC_SUPABASE_URL=your_supabase_url
   PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   
   # Stripe
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET=your_webhook_secret
   
   # Crystallize (Optional)
   CRYSTALLIZE_TENANT_ID=your_tenant_id
   CRYSTALLIZE_ACCESS_TOKEN_ID=your_access_token_id
   CRYSTALLIZE_ACCESS_TOKEN_SECRET=your_access_token_secret
   
   # MailerSend (Optional)
   MAILERSEND_API_TOKEN=your_mailersend_token
   ```

4. **Database Setup**
   - Connect to Supabase in the project
   - Run the migration: `supabase/migrations/20250629032549_wandering_meadow.sql`

5. **Start Development Server**
   ```bash
   npm run dev
   ```

### Deployment

The application is configured for Netlify deployment:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your repository to Netlify
   - Configure environment variables
   - Deploy with automatic builds on push

## 📁 Project Structure

```
├── src/
│   ├── components/          # Reusable UI components
│   ├── layouts/            # Page layouts
│   ├── pages/              # Route pages
│   ├── lib/                # Utility libraries and integrations
│   ├── scripts/            # Client-side JavaScript
│   └── styles/             # Global styles
├── supabase/
│   ├── functions/          # Edge functions
│   └── migrations/         # Database migrations
├── public/                 # Static assets
└── astro.config.mjs       # Astro configuration
```

## 🔒 Security Features

- **Row Level Security**: Database-level access control
- **CORS Protection**: Proper cross-origin request handling
- **Input Validation**: Server-side validation for all forms
- **Secure Headers**: CSP and security headers via Netlify
- **Environment Variables**: Sensitive data protection

## 🎯 Performance Optimizations

- **Static Generation**: Pre-built pages for optimal loading
- **Image Optimization**: Responsive images with proper sizing
- **Code Splitting**: Minimal JavaScript bundles
- **Caching Strategy**: Aggressive caching for static assets
- **Edge Functions**: Global distribution for API calls

## 🧪 Testing & Quality

- **TypeScript**: Type safety throughout the application
- **ESLint**: Code quality and consistency
- **Responsive Testing**: Cross-device compatibility
- **Accessibility Testing**: WCAG compliance verification

## 📈 Analytics & Monitoring

- **Error Tracking**: Comprehensive error handling and logging
- **Performance Monitoring**: Core Web Vitals tracking
- **User Analytics**: Privacy-focused usage analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Hackathon Badge

This project was built with [bolt.new](https://bolt.new) as part of the World's Largest Hackathon.

---

**Built with ❤️ and ☕ by the Javamate team**