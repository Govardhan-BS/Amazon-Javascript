let cartFromStorage;
try {
  cartFromStorage = JSON.parse(localStorage.getItem('cart'));
} catch (error) {
  console.error('Error parsing cart from localStorage:', error);
  cartFromStorage = null;
}

export let cart = cartFromStorage;

if (!cart || !Array.isArray(cart)) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}

function saveToStorage() {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
}

export function addToCart(productId) {
  try {
    if (!productId) {
      console.error('Product ID is required');
      return;
    }

    let matchingItem;

    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }

    saveToStorage();
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
}

export function removeFromCart(productId) {
  try {
    if (!productId) {
      console.error('Product ID is required');
      return;
    }

    const newCart = [];

    cart.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    cart = newCart;

    saveToStorage();
  } catch (error) {
    console.error('Error removing from cart:', error);
  }
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  try {
    if (!productId || !deliveryOptionId) {
      console.error('Product ID and delivery option ID are required');
      return;
    }

    let matchingItem;

    cart.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.deliveryOptionId = deliveryOptionId;
      saveToStorage();
    } else {
      console.error('Product not found in cart');
    }
  } catch (error) {
    console.error('Error updating delivery option:', error);
  }
}