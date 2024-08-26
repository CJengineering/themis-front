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
export const convertToUSD = async (amount:number, fromCurrency:string) => {
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/8c5e0b03bf114e85385e50bd/latest/USD`);
    const data = await response.json();
    
    if (data.result === "success") {
      const conversionRate = data.conversion_rates[fromCurrency];
      
      if (conversionRate) {
        const convertedAmount = amount / conversionRate;
        return convertedAmount;
      } else {
        console.error('Currency not found in the conversion rates.');
        return null;
      }
    } else {
      console.error('Error in API response:', data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching conversion data:', error);
    return null;
  }
};

export const fetchConversionRates = async () => {
  const initialRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.75,
    SAR: 3.75,
  };
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/8c5e0b03bf114e85385e50bd/latest/USD`
    );
    const data = await response.json();
    if (data.result === "success") {
      return {
        USD: 1,
        EUR: data.conversion_rates["EUR"],
        GBP: data.conversion_rates["GBP"],
        SAR: data.conversion_rates["SAR"],
      };
    } else {
      console.error("Error in API response:", data);
      return initialRates;
    }
  } catch (error) {
    console.error("Error fetching conversion data:", error);
    return initialRates;
  }
};
const currencyOptions = ["USD", "EUR", "GBP", "SAR"] as const;

export const calculateConvertedAmounts = (
  amount: number,
  fromCurrency: typeof currencyOptions[number],
  rates: { [key: string]: number }
) => {
  const baseAmountInUSD = amount / rates[fromCurrency];
  return {
    priceInUSD: parseFloat((baseAmountInUSD * rates["USD"]).toFixed(2)),
    priceInEUR: parseFloat((baseAmountInUSD * rates["EUR"]).toFixed(2)),
    priceInGBP: parseFloat((baseAmountInUSD * rates["GBP"]).toFixed(2)),
    priceInSAR: parseFloat((baseAmountInUSD * rates["SAR"]).toFixed(2)),
  };
}