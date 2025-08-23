export function formatCurrency(priceCents) {
  try {
    if (typeof priceCents !== 'number' || isNaN(priceCents)) {
      console.error('Invalid price value:', priceCents);
      return '0.00';
    }
    
    if (priceCents < 0) {
      console.warn('Negative price detected:', priceCents);
      priceCents = Math.abs(priceCents);
    }
    
    return (Math.round(priceCents) / 100).toFixed(2);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return '0.00';
  }
}

export default formatCurrency;