// Intersection Observer for reveal animations
document.addEventListener('DOMContentLoaded', () => {
  // Reveal elements when they come into view
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add a delay based on custom attribute if it exists
          const delay = entry.target.style.getPropertyValue('--reveal-delay') || '0s';
          entry.target.style.transitionDelay = delay;
          entry.target.classList.add('active');
          // Unobserve after animation
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );
  
  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
  
  // Product hover effects
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      const image = card.querySelector('img');
      if (image) {
        image.style.transform = 'scale(1.05)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const image = card.querySelector('img');
      if (image) {
        image.style.transform = 'scale(1)';
      }
    });
  });
  
  // Simulate cart functionality
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartCount = document.getElementById('cart-count');
  
  if (addToCartButtons.length > 0 && cartCount) {
    let count = parseInt(localStorage.getItem('cartCount') || '0');
    cartCount.textContent = count.toString();
    
    addToCartButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        count++;
        cartCount.textContent = count.toString();
        localStorage.setItem('cartCount', count.toString());
        
        // Show added to cart message
        const message = document.createElement('div');
        message.textContent = 'Added to cart!';
        message.className = 'fixed top-24 right-8 bg-success-500 text-white py-2 px-4 rounded-lg shadow-md z-50 animate-fade-in';
        document.body.appendChild(message);
        
        setTimeout(() => {
          message.remove();
        }, 2000);
      });
    });
  }
});