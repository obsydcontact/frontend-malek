import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a digits-only international phone number (e.g. "41766879555")
 * into a readable Swiss-style display format (e.g. "+41 76 687 95 55").
 * Falls back to a simple "+<digits>" for numbers that don't match the
 * expected Swiss mobile length.
 */
export function formatPhoneDisplay(digits: string) {
  const match = digits.match(/^(\d{2})(\d{2})(\d{3})(\d{2})(\d{2})$/);
  if (!match) return `+${digits}`;
  const [, country, prefix, part1, part2, part3] = match;
  return `+${country} ${prefix} ${part1} ${part2} ${part3}`;
}
