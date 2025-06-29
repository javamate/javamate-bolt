// Enhanced cart functionality for product and shop pages
document.addEventListener('DOMContentLoaded', () => {
  // Initialize cart count from localStorage
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    const count = localStorage.getItem('cartCount') || '0';
    cartCount.textContent = count;
  }
  
  // Enhanced add to cart functionality
  document.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart')) {
      e.preventDefault();
      
      const button = e.target.closest('.add-to-cart');
      const productId = button.dataset.productId;
      
      // Get product details from the page
      let productData = {};
      
      // Check if we're on a product page (has form with grind and quantity)
      const productForm = button.closest('form');
      if (productForm) {
        const formData = new FormData(productForm);
        const title = document.querySelector('h1')?.textContent || 'Coffee';
        const priceElement = document.getElementById('total-price') || document.querySelector('[data-price]');
        const rawPrice = priceElement ? parseFloat(priceElement.textContent || priceElement.dataset.price) : 0;
        const quantity = parseInt(formData.get('quantity') || '1');
        const price = isNaN(rawPrice) ? 0 : rawPrice / quantity; // Get unit price
        const image = document.getElementById('main-image')?.src || 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg';
        const size = formData.get('size') || '12oz';
        const grind = formData.get('grind') || 'whole-bean';
        
        // Try to get variant info from the page if available
        let variantId = null;
        let stripePriceId = null;
        
        // Check if there's variant data available in the page
        if (window.variants && window.variants.length > 0) {
          const matchingVariant = window.variants.find(v => 
            v.size === size && v.grind === grind
          ) || window.variants.find(v => v.size === size) || window.variants[0];
          
          if (matchingVariant) {
            variantId = matchingVariant.id;
            stripePriceId = matchingVariant.stripe_price_id;
          }
        }
        
        productData = {
          productId,
          variantId,
          title,
          price: isNaN(price) ? 0 : price,
          image,
          grind,
          size,
          quantity,
          stripePriceId
        };
      } else {
        // We're on shop page or product card
        const card = button.closest('.card, .product-card');
        const title = card?.querySelector('h3')?.textContent || 'Coffee';
        
        // More specific price selector - look for the price in the flex container at the bottom
        let priceText = '$0.00';
        const priceContainer = card?.querySelector('.flex.items-center.justify-between');
        if (priceContainer) {
          // Look for the span with price (should be the first child with $ symbol)
          const priceSpan = priceContainer.querySelector('span');
          if (priceSpan && priceSpan.textContent.includes('$')) {
            priceText = priceSpan.textContent;
          }
        }
        
        // Fallback to any element with $ in text content within the card
        if (priceText === '$0.00') {
          const allSpans = card?.querySelectorAll('span');
          if (allSpans) {
            for (const span of allSpans) {
              if (span.textContent.includes('$') && span.textContent.match(/\$\d+\.\d{2}/)) {
                priceText = span.textContent;
                break;
              }
            }
          }
        }
        
        // Handle "From $X.XX" pricing
        if (priceText.includes('From ')) {
          priceText = priceText.replace('From ', '');
        }
        
        const rawPrice = parseFloat(priceText.replace('$', ''));
        const price = isNaN(rawPrice) ? 0 : rawPrice;
        const image = card?.querySelector('img')?.src || 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg';
        
        productData = {
          productId,
          variantId: null,
          title,
          price,
          image,
          grind: 'whole-bean',
          size: '12oz',
          quantity: 1,
          stripePriceId: null
        };
      }
      
      // Add to cart
      addToCartStorage(productData);
      
      // Update cart count
      updateCartCount();
      
      // Show success message
      showAddToCartMessage(productData.quantity, productData.size, productData.grind);
      
      // Add visual feedback to button
      const originalText = button.textContent;
      button.textContent = 'Added!';
      button.classList.add('bg-success-500', 'hover:bg-success-600');
      
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('bg-success-500', 'hover:bg-success-600');
      }, 1500);
    }
  });
  
  function addToCartStorage(productData) {
    try {
      let cart = JSON.parse(localStorage.getItem('javamate-cart') || '[]');
      
      // Check if item with same product, size, and grind already exists
      const existingItem = cart.find(item => 
        item.productId === productData.productId && 
        item.grind === productData.grind &&
        item.size === productData.size
      );
      
      if (existingItem) {
        existingItem.quantity += productData.quantity;
      } else {
        cart.push({
          id: Date.now().toString(),
          ...productData
        });
      }
      
      localStorage.setItem('javamate-cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }
  
  function updateCartCount() {
    try {
      const cart = JSON.parse(localStorage.getItem('javamate-cart') || '[]');
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      
      const cartCount = document.getElementById('cart-count');
      if (cartCount) {
        cartCount.textContent = totalItems.toString();
        localStorage.setItem('cartCount', totalItems.toString());
      }
    } catch (error) {
      console.error('Error updating cart count:', error);
    }
  }
  
  function showAddToCartMessage(quantity, size, grind) {
    const grindText = grind === 'whole-bean' ? 'whole bean' : grind;
    const message = document.createElement('div');
    message.innerHTML = `
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Added ${quantity} ${size} ${grindText} to cart!
      </div>
    `;
    message.className = 'fixed top-24 right-8 bg-success-500 text-white py-3 px-6 rounded-lg shadow-lg z-50 animate-fade-in';
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.remove();
    }, 3000);
  }
});