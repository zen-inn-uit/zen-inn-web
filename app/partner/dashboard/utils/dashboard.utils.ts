import type { StatDTO } from '../dto/dashboard.dto';

/**
 * Format number with comma separators
 */
export function formatNumber(value: number): string {
  return value.toLocaleString();
}

/**
 * Format currency
 */
export function formatCurrency(value: number): string {
  return `$${value.toLocaleString()}`;
}

/**
 * Get trend icon and color based on stat
 */
export function getTrendInfo(stat: StatDTO): { icon: string; color: string } {
  return stat.isUp 
    ? { icon: '↑', color: 'text-green-600' }
    : { icon: '↓', color: 'text-red-600' };
}

/**
 * Calculate percentage change
 */
export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}
