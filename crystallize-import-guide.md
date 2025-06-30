# Crystallize CLI Import Guide for Javamate Coffee Catalog

This guide provides step-by-step instructions for importing the Javamate Coffee product catalog into Crystallize using the `@crystallize/cli-next` import command.

## Prerequisites

- Node.js 18+ installed
- Crystallize tenant account with admin access
- `@crystallize/cli-next` package installed globally

## Installation

Install the Crystallize CLI:

```bash
npm install -g @crystallize/cli-next
```

## Step 1: Prepare the Import File

The `crystallize-product-specification.json` file is already formatted for the CLI import command. It includes:

- **Spec Section**: Defines shapes, price variants, VAT types, stock locations, and subscription plans
- **Items Section**: Contains all product data with components and variants

## Step 2: Authenticate with Crystallize

Set up your Crystallize credentials:

```bash
crystallize config
```

Enter your:
- Tenant identifier
- Access token ID  
- Access token secret

## Step 3: Validate the Import File

Before importing, validate the specification:

```bash
crystallize import --validate crystallize-product-specification.json
```

This will check for:
- Correct schema format
- Required fields
- Data type validation
- Reference integrity

## Step 4: Import the Catalog

Run the import command:

```bash
crystallize import crystallize-product-specification.json
```

### Import Options

For a dry run (preview without importing):
```bash
crystallize import --dry-run crystallize-product-specification.json
```

To force overwrite existing items:
```bash
crystallize import --force crystallize-product-specification.json
```

To import only specific sections:
```bash
crystallize import --only-spec crystallize-product-specification.json
crystallize import --only-items crystallize-product-specification.json
```

## Step 5: Verify the Import

After import completion:

1. **Check Shapes**: Verify the `coffee-product` shape was created with all components
2. **Review Products**: Confirm all 6 products were imported correctly
3. **Validate Variants**: Check that all variants have proper attributes and pricing
4. **Test Stock Locations**: Ensure inventory was assigned correctly
5. **Verify Price Variants**: Confirm USD pricing is set up properly

## Import Structure Breakdown

### Spec Section

#### Shapes
- **coffee-product**: Product shape with components for coffee-specific attributes
  - Basic info (name, description, origin)
  - Coffee attributes (roast level, processing method, altitude)
  - Marketing flags (featured, new arrival)
  - Media and SEO components

#### Price Variants
- **usd**: USD currency configuration

#### Stock Locations
- **main-warehouse**: Primary inventory location with min/max settings

#### Subscription Plans
- **monthly-coffee**: Monthly subscription option

### Items Section

Each product includes:
- **Tree Path**: URL structure (`/shop/product-name`)
- **Components**: All product data matching the shape definition
- **Variants**: Size and grind combinations with pricing and inventory

### Key Features

#### Rich Text Content
Descriptions use HTML format:
```json
"description": {
  "html": [
    "<p>Product description paragraph 1</p>",
    "<p>Product description paragraph 2</p>"
  ]
}
```

#### Variant Attributes
Size and grind stored as attributes:
```json
"attributes": {
  "size": "12oz",
  "grind": "whole-bean"
}
```

#### Pricing Structure
Simple price variant mapping:
```json
"priceVariants": {
  "usd": 16.99
}
```

#### Stock Management
Inventory by location:
```json
"stock": {
  "main-warehouse": 100
}
```

#### External References
Stripe price IDs for payment integration:
```json
"externalReference": "price_1RKgo2R1hBQXgqR7RYvtL02O"
```

## Product Catalog Overview

### Products Included

1. **Ethiopian Yirgacheffe** - Light roast, bright and fruity
2. **Colombian Supremo** - Medium roast, balanced and sweet
3. **Guatemala Antigua** - Medium-dark roast, rich and complex
4. **Sumatra Mandheling** - Dark roast, bold and earthy
5. **Organic Peru SWP Decaf** - Medium roast, chemical-free decaf
6. **Javamate House Blend** - Medium roast, signature blend

### Variant Options

Each product includes variants for:
- **Sizes**: 12oz, 16oz (House Blend also includes 2lb)
- **Grinds**: Whole bean, Medium grind
- **Pricing**: USD pricing for all variants
- **Stock**: Inventory levels per variant

### Certifications

Products include various certifications:
- Organic
- Fair Trade
- Rainforest Alliance
- Shade Grown

## Post-Import Configuration

### 1. Image Upload

Upload product images to Crystallize media library and update image references if needed.

### 2. SEO Configuration

Verify SEO components are properly set:
- Meta titles
- Meta descriptions
- URL patterns

### 3. Category Assignment

Organize products into categories:
- Single Origin
- Blends
- Decaf
- Featured
- New Arrivals

### 4. Stripe Integration

For variants with `externalReference`:
1. Verify Stripe price IDs are correct
2. Test payment integration
3. Configure webhook endpoints

### 5. Subscription Setup

If using subscriptions:
1. Configure subscription plans
2. Set up billing cycles
3. Test subscription checkout

## Troubleshooting

### Common Import Issues

1. **Authentication Errors**
   ```bash
   crystallize config --reset
   ```

2. **Validation Failures**
   - Check JSON syntax
   - Verify required fields
   - Validate data types

3. **Shape Creation Issues**
   - Ensure unique component IDs
   - Check component type definitions
   - Verify selection options format

4. **Variant Import Problems**
   - Validate attribute structure
   - Check price variant format
   - Ensure stock location exists

### CLI Commands Reference

```bash
# Show help
crystallize import --help

# Check CLI version
crystallize --version

# View current configuration
crystallize config --show

# Import with verbose logging
crystallize import --verbose crystallize-product-specification.json

# Import specific tenant
crystallize import --tenant your-tenant crystallize-product-specification.json
```

## Monitoring Import Progress

The CLI provides real-time feedback:
- Shape creation progress
- Item import status
- Error reporting
- Success confirmation

## Best Practices

1. **Always validate before importing**
2. **Use dry-run for testing**
3. **Backup existing data**
4. **Import during low-traffic periods**
5. **Monitor import logs**
6. **Test functionality after import**

## Support Resources

- **Crystallize CLI Documentation**: https://crystallize.com/learn/developer-guides/cli
- **Import Schema Reference**: https://crystallize.com/learn/developer-guides/import-export
- **Community Support**: https://crystallize.com/community
- **API Documentation**: https://crystallize.com/learn/developer-guides/api-overview

## Next Steps

After successful import:

1. **Configure your application** to use Crystallize API
2. **Set up webhooks** for real-time updates
3. **Test the complete flow** from catalog to checkout
4. **Monitor performance** and optimize as needed
5. **Plan for ongoing content management**

The import process creates a complete, production-ready coffee catalog that integrates seamlessly with the Javamate Coffee application's existing Stripe and Supabase infrastructure.