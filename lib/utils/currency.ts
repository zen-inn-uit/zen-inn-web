/**
 * Format a number as currency with thousand separators
 * @param amount - The amount to format
 * @param currency - Currency code (default: 'VND')
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number | string | null | undefined, currency: string = 'VND'): string {
  if (amount === null || amount === undefined) {
    return '0';
  }

  // Convert string to number if needed
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) {
    return '0';
  }

  // Format with thousand separators
  const formatted = new Intl.NumberFormat('vi-VN').format(numAmount);
  
  return formatted;
}

/**
 * Format price with currency symbol
 * @param amount - The amount to format
 * @param currency - Currency code (default: 'VND')
 * @returns Formatted price with currency
 */
export function formatPrice(amount: number | string | null | undefined, currency: string = 'VND'): string {
  const formatted = formatCurrency(amount, currency);
  
  if (currency === 'VND') {
    return `${formatted}₫`;
  } else if (currency === 'USD') {
    return `$${formatted}`;
  }
  
  return `${formatted} ${currency}`;
}

