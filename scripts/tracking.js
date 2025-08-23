import {cart} from '../data/cart.js';

function updateCartQuantity() {
  try {
    let cartQuantity = 0;
    
    if (cart && Array.isArray(cart)) {
      cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
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

function initializeTrackingPage() {
  try {
    updateCartQuantity();
  } catch (error) {
    console.error('Error initializing tracking page:', error);
  }
}

document.addEventListener('DOMContentLoaded', initializeTrackingPage);
