import {cart} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';

export function renderPaymentSummary() {
  try {
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      const paymentSummaryElement = document.querySelector('.js-payment-summary');
      if (paymentSummaryElement) {
        paymentSummaryElement.innerHTML = '<div class="empty-cart-message">Your cart is empty.</div>';
      }
      return;
    }

    let productPriceCents = 0;
    let shippingPriceCents = 0;
    let itemCount = 0;

    cart.forEach((cartItem) => {
      try {
        if (!cartItem || !cartItem.productId) {
          console.warn('Invalid cart item:', cartItem);
          return;
        }

        const product = getProduct(cartItem.productId);
        if (!product) {
          console.warn(`Product not found for ID: ${cartItem.productId}`);
          return;
        }

        const quantity = cartItem.quantity || 1;
        productPriceCents += product.priceCents * quantity;
        itemCount += quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId || '1');
        if (deliveryOption) {
          shippingPriceCents += deliveryOption.priceCents;
        }
      } catch (error) {
        console.error('Error processing cart item:', cartItem, error);
      }
    });

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    const paymentSummaryHTML = `
      <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${itemCount}):</div>
        <div class="payment-summary-money">
          $${formatCurrency(productPriceCents)}
        </div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">
          $${formatCurrency(shippingPriceCents)}
        </div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">
          $${formatCurrency(totalBeforeTaxCents)}
        </div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">
          $${formatCurrency(taxCents)}
        </div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">
          $${formatCurrency(totalCents)}
        </div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>
    `;

    const paymentSummaryElement = document.querySelector('.js-payment-summary');
    if (paymentSummaryElement) {
      paymentSummaryElement.innerHTML = paymentSummaryHTML;
    } else {
      console.error('Payment summary element not found');
    }
  } catch (error) {
    console.error('Error rendering payment summary:', error);
    const paymentSummaryElement = document.querySelector('.js-payment-summary');
    if (paymentSummaryElement) {
      paymentSummaryElement.innerHTML = '<div class="error-message">Error loading payment summary. Please refresh the page.</div>';
    }
  }
}