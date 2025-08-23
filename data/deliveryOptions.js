export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
  try {
    if (!deliveryOptionId) {
      console.warn('Delivery option ID is required');
      return deliveryOptions[0];
    }

    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });

    if (!deliveryOption) {
      console.warn(`Delivery option with ID ${deliveryOptionId} not found, using default`);
      return deliveryOptions[0];
    }

    return deliveryOption;
  } catch (error) {
    console.error('Error getting delivery option:', error);
    return deliveryOptions[0];
  }
}