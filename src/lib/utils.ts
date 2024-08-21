import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getFirstThreeConsonants(cityName: string): string {
  const consonants = cityName.match(/[^aeiou]/gi) || [];
  return consonants.length < 3
    ? consonants.join('').toUpperCase()
    : consonants.slice(0, 3).join('').toUpperCase();
}

export function toUTCDate(date: Date): Date {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return new Date(Date.UTC(year, month, day));
}

export function debounce<F extends (...args: any[]) => void>(
  func: F,
  waitFor: number
): (...args: Parameters<F>) => void {
  let timeoutId: NodeJS.Timeout;
  return function (...args: Parameters<F>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), waitFor);
  };
}

export function formatDate(date: Date): string {
  return format(date, 'PPP');
}