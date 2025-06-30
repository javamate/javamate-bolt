# Crystallize Import Guide for Javamate Coffee Catalog

This guide provides step-by-step instructions for importing the Javamate Coffee product catalog into Crystallize.

## Prerequisites

- Crystallize tenant account with admin access
- Access to Crystallize PIM (Product Information Management)
- Product images uploaded to a CDN or image hosting service

## Step 1: Create Product Shape

### Coffee Product Shape

1. Navigate to **Settings > Shapes** in your Crystallize dashboard
2. Click **Create Shape** and select **Product**
3. Set the identifier as `coffee-product` and name as `Coffee Product`
4. Add the following components:

#### Basic Information
- **name** (Single Line, Required): Product Name
- **description** (Rich Text, Required): Full product description
- **short-description** (Single Line, Required): Brief product summary

#### Coffee-Specific Attributes
- **origin** (Single Line, Required): Origin country/region
- **roast-level** (Selection, Required): Light, Medium-Light, Medium, Medium-Dark, Dark
- **processing-method** (Selection): Washed, Natural, Honey, Semi-Washed
- **altitude** (Single Line): Growing altitude
- **tasting-notes** (Paragraph Collection, Max 5): Flavor notes
- **certifications** (Selection, Multiple): Organic, Fair Trade, etc.

#### Marketing Flags
- **featured** (Boolean): Featured product flag
- **new-arrival** (Boolean): New arrival flag

#### Media & SEO
- **images** (Images, Required, Max 10): Product photos
- **seo** (Content Chunk): SEO title and meta description

**Note:** Variants are created directly in the product catalog, not as separate shapes. Crystallize handles variants with attributes and priceVariants structure.

## Step 2: Set Up Categories

Create the following category structure in **Catalogue**:

```
├── Single Origin
├── Blends  
├── Decaf
├── Featured
└── New Arrivals
```

## Step 3: Import Products

### Ethiopian Yirgacheffe

**Basic Information:**
- Name: Ethiopian Yirgacheffe
- Short Description: Bright and fruity with notes of bergamot and lemon
- Origin: Ethiopia
- Roast Level: Light
- Processing Method: Washed
- Altitude: 1,800-2,200 meters
- Certifications: Organic, Fair Trade
- Featured: Yes
- New Arrival: Yes

**Tasting Notes:**
- Bergamot
- Lemon zest  
- Floral notes
- Wine-like acidity
- Clean finish

**Variants:**
1. 12oz Whole Bean - SKU: ETH-YIR-12-WB
   - Attributes: size="12oz", grind="whole-bean"
   - Price Variants: USD $16.99
   - Stock: 100, Weight: 340g

2. 12oz Medium Grind - SKU: ETH-YIR-12-MED
   - Attributes: size="12oz", grind="medium"
   - Price Variants: USD $16.99
   - Stock: 75, Weight: 340g

3. 16oz Whole Bean - SKU: ETH-YIR-16-WB
   - Attributes: size="16oz", grind="whole-bean"
   - Price Variants: USD $21.99
   - Stock: 80, Weight: 454g

4. 16oz Medium Grind - SKU: ETH-YIR-16-MED
   - Attributes: size="16oz", grind="medium"
   - Price Variants: USD $21.99
   - Stock: 60, Weight: 454g

### Colombian Supremo

**Basic Information:**
- Name: Colombian Supremo
- Short Description: Sweet and balanced with notes of caramel and chocolate
- Origin: Colombia
- Roast Level: Medium
- Processing Method: Washed
- Altitude: 1,200-1,800 meters
- Certifications: Rainforest Alliance
- Featured: Yes
- New Arrival: No

**Variants:**
1. 12oz Whole Bean - SKU: COL-SUP-12-WB - USD $15.99
2. 12oz Medium Grind - SKU: COL-SUP-12-MED - USD $15.99
3. 16oz Whole Bean - SKU: COL-SUP-16-WB - USD $20.99
4. 16oz Medium Grind - SKU: COL-SUP-16-MED - USD $20.99

### Guatemala Antigua

**Basic Information:**
- Name: Guatemala Antigua
- Short Description: Rich and complex with notes of cocoa and spice
- Origin: Guatemala
- Roast Level: Medium-Dark
- Processing Method: Washed
- Altitude: 1,500-1,700 meters
- Certifications: Organic, Shade Grown
- Featured: Yes
- New Arrival: No

**Variants:**
1. 12oz Whole Bean - SKU: GUA-ANT-12-WB - USD $17.99
2. 12oz Medium Grind - SKU: GUA-ANT-12-MED - USD $17.99
3. 16oz Whole Bean - SKU: GUA-ANT-16-WB - USD $22.99
4. 16oz Medium Grind - SKU: GUA-ANT-16-MED - USD $22.99

### Sumatra Mandheling

**Basic Information:**
- Name: Sumatra Mandheling
- Short Description: Bold and earthy with notes of cedar and herbs
- Origin: Indonesia
- Roast Level: Dark
- Processing Method: Semi-Washed
- Altitude: 750-1,500 meters
- Certifications: Organic, Fair Trade
- Featured: Yes
- New Arrival: No

**Variants:**
1. 12oz Whole Bean - SKU: SUM-MAN-12-WB - USD $18.99
2. 12oz Medium Grind - SKU: SUM-MAN-12-MED - USD $18.99
3. 16oz Whole Bean - SKU: SUM-MAN-16-WB - USD $23.99
4. 16oz Medium Grind - SKU: SUM-MAN-16-MED - USD $23.99

### Organic Peru SWP Decaf

**Basic Information:**
- Name: Organic Peru SWP Decaf
- Short Description: Chemical-free decaf with rich chocolate and caramel notes
- Origin: Peru
- Roast Level: Medium
- Processing Method: Washed
- Altitude: 1,200-1,800 meters
- Certifications: Organic, Fair Trade
- Featured: No
- New Arrival: Yes

**Variants:**
1. 12oz Whole Bean - SKU: PER-DEC-12-WB - USD $19.99
   - External Reference: price_1RKgo2R1hBQXgqR7RYvtL02O (Stripe Price ID)
2. 12oz Medium Grind - SKU: PER-DEC-12-MED - USD $19.99
3. 16oz Whole Bean - SKU: PER-DEC-16-WB - USD $24.99
4. 16oz Medium Grind - SKU: PER-DEC-16-MED - USD $24.99

### Javamate House Blend

**Basic Information:**
- Name: Javamate House Blend
- Short Description: Our signature blend with perfect balance and versatility
- Origin: Blend (Colombia, Brazil, Guatemala)
- Roast Level: Medium
- Processing Method: Washed
- Certifications: Rainforest Alliance
- Featured: Yes
- New Arrival: No

**Variants:**
1. 12oz Whole Bean - SKU: HOU-BLE-12-WB - USD $14.99
2. 12oz Medium Grind - SKU: HOU-BLE-12-MED - USD $14.99
3. 16oz Whole Bean - SKU: HOU-BLE-16-WB - USD $19.99
4. 16oz Medium Grind - SKU: HOU-BLE-16-MED - USD $19.99
5. 2lb Whole Bean - SKU: HOU-BLE-2LB-WB - USD $34.99

## Step 4: Configure Pricing

1. Navigate to **Settings > Price Books**
2. Create a price book named "USD Retail Prices" with currency USD
3. For each variant, configure the priceVariants array:
   ```json
   "priceVariants": [
     {
       "identifier": "usd",
       "price": 16.99,
       "currency": "USD"
     }
   ]
   ```

## Step 5: Set Up Inventory

1. Go to **Settings > Stock Locations**
2. Create a stock location named "Main Warehouse"
3. Set minimum stock level to 10 and maximum to 1000
4. Assign initial stock quantities to all variants

## Step 6: Configure Variant Attributes

For each variant, set the attributes properly:

```json
"attributes": {
  "size": "12oz",
  "grind": "whole-bean"
}
```

Available size options: 8oz, 12oz, 16oz, 2lb, 5lb
Available grind options: whole-bean, coarse, medium-coarse, medium, medium-fine, fine

## Step 7: Configure Stripe Integration

1. For variants with Stripe price IDs, add them to the `externalReference` field
2. Ensure the Stripe price IDs match those configured in your Stripe dashboard
3. Test the integration with your application's checkout process

## Step 8: Set Up Subscriptions (Optional)

If offering subscription services:

1. Navigate to **Settings > Subscription Plans**
2. Create plans for:
   - Monthly Coffee Subscription
   - Bi-Weekly Coffee Subscription
3. Configure pricing and billing cycles

## Step 9: Configure Webhooks

Set up webhooks to sync data with your application:

1. Go to **Settings > Webhooks**
2. Add webhook endpoints for:
   - Product updates
   - Inventory changes
   - Order creation

## Step 10: Test Integration

1. Verify all products display correctly in your application
2. Test variant selection and pricing
3. Confirm checkout process works with Stripe integration
4. Validate inventory updates sync properly

## Important Notes

### Variant Structure
- **Attributes**: Use the `attributes` object to store size and grind information
- **Price Variants**: Use the `priceVariants` array for pricing with identifier, price, and currency
- **External Reference**: Store Stripe price IDs in the `externalReference` field
- **Stock**: Set stock levels directly on the variant

### Data Format
```json
{
  "name": "Product Name - Size Grind",
  "sku": "PRODUCT-SIZE-GRIND",
  "attributes": {
    "size": "12oz",
    "grind": "whole-bean"
  },
  "priceVariants": [
    {
      "identifier": "usd",
      "price": 16.99,
      "currency": "USD"
    }
  ],
  "stock": 100,
  "weight": 340,
  "externalReference": "stripe_price_id_here"
}
```

## Additional Configuration

### SEO Optimization
- Configure URL patterns for product pages
- Set up meta titles and descriptions
- Enable sitemap generation

### Image Optimization
- Upload high-quality product images
- Configure image transformations for different screen sizes
- Set up CDN for fast image delivery

### API Configuration
- Configure API access tokens for your application
- Set up proper authentication and permissions
- Test API endpoints for product data retrieval

## Troubleshooting

### Common Issues

1. **Missing Required Fields**: Ensure all required components are filled
2. **Pricing Errors**: Verify priceVariants structure and currency settings
3. **Image Loading Issues**: Check image URLs and CDN configuration
4. **API Connection Problems**: Verify access tokens and tenant configuration
5. **Variant Attribute Issues**: Ensure attributes are properly structured as key-value pairs

### Support Resources

- Crystallize Documentation: https://crystallize.com/learn
- API Reference: https://crystallize.com/learn/developer-guides/api-overview
- Community Forum: https://crystallize.com/community

## Maintenance

### Regular Tasks
- Update product descriptions and images
- Monitor inventory levels
- Review and update pricing
- Add new products and variants as needed
- Monitor API usage and performance

### Backup Strategy
- Export product data regularly
- Backup media files
- Document configuration changes
- Maintain version control for shape definitions