import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {cart} from '../data/cart.js';

function updateCartCount() {
  try {
    let cartCount = 0;
    
    if (cart && Array.isArray(cart)) {
      cart.forEach((cartItem) => {
        cartCount += cartItem.quantity || 0;
      });
    }
    
    const cartCountElement = document.querySelector('.js-cart-count');
    if (cartCountElement) {
      cartCountElement.innerHTML = cartCount;
    }
  } catch (error) {
    console.error('Error updating cart count:', error);
    const cartCountElement = document.querySelector('.js-cart-count');
    if (cartCountElement) {
      cartCountElement.innerHTML = '0';
    }
  }
}

function initializeCheckout() {
  try {
    updateCartCount();
    renderOrderSummary();
    renderPaymentSummary();
  } catch (error) {
    console.error('Error initializing checkout:', error);
  }
}

document.addEventListener('DOMContentLoaded', initializeCheckout);