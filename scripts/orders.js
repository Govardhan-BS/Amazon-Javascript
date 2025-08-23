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

function initializeOrdersPage() {
  try {
    updateCartQuantity();
    
    const buyAgainButtons = document.querySelectorAll('.buy-again-button');
    buyAgainButtons.forEach(button => {
      button.addEventListener('click', () => {
        try {
          window.location.href = 'amazon.html';
        } catch (error) {
          console.error('Error navigating to main page:', error);
        }
      });
    });
  } catch (error) {
    console.error('Error initializing orders page:', error);
  }
}

document.addEventListener('DOMContentLoaded', initializeOrdersPage);
