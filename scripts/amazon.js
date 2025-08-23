import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

let productsHTML = '';

try {
  if (!products || !Array.isArray(products)) {
    throw new Error('Products data is not available');
  }

  products.forEach((product) => {
    try {
      if (!product || !product.id || !product.name || !product.priceCents) {
        console.warn('Invalid product data:', product);
        return;
      }

      productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image || 'images/products/placeholder.jpg'}"
              alt="${product.name}"
              onerror="this.src='images/products/placeholder.jpg'">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${(product.rating?.stars || 0) * 10}.png"
              alt="Rating: ${product.rating?.stars || 0} stars">
            <div class="product-rating-count link-primary">
              ${product.rating?.count || 0}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" alt="Added to cart">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      `;
    } catch (error) {
      console.error('Error rendering product:', product, error);
    }
  });
} catch (error) {
  console.error('Error initializing products:', error);
  productsHTML = '<div class="error-message">Error loading products. Please refresh the page.</div>';
}

try {
  const productsGrid = document.querySelector('.js-products-grid');
  if (productsGrid) {
    productsGrid.innerHTML = productsHTML;
  } else {
    console.error('Products grid element not found');
  }
} catch (error) {
  console.error('Error updating products grid:', error);
}

function updateCartQuantity() {
  try {
    let cartQuantity = 0;

    if (cart && Array.isArray(cart)) {
      cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity || 0;
      });
    }

    const cartQuantityElement = document.querySelector('.js-cart-quantity');
    if (cartQuantityElement) {
      cartQuantityElement.innerHTML = cartQuantity;
    }
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    const cartQuantityElement = document.querySelector('.js-cart-quantity');
    if (cartQuantityElement) {
      cartQuantityElement.innerHTML = '0';
    }
  }
}

try {
  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
        try {
          const productId = button.dataset.productId;
          if (!productId) {
            console.error('Product ID not found in button data');
            return;
          }
          
          addToCart(productId);
          updateCartQuantity();
          
          const addedMessage = button.parentElement.querySelector('.added-to-cart');
          if (addedMessage) {
            addedMessage.style.opacity = '1';
            setTimeout(() => {
              addedMessage.style.opacity = '0';
            }, 2000);
          }
        } catch (error) {
          console.error('Error adding to cart:', error);
        }
      });
    });
} catch (error) {
  console.error('Error setting up add to cart buttons:', error);
}

// Initialize cart quantity on page load
document.addEventListener('DOMContentLoaded', updateCartQuantity);