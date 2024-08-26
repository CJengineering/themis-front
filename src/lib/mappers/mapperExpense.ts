import { Expense } from "@/interfaces";

export function mapExpenses(expensesArray: Array<{
    id: number;
    nature: string;
    amount: number;
    currency: string;
    priceInUSD?: number;
    priceInEUR?: number;
    priceInGBP?: number;
    priceSAR?: number;
    receiptImageUrl?: string;
}>): Expense[] {
    return expensesArray.map(expense => ({
        id: expense.id,
        date: new Date().toISOString(), // Assuming current date for each entry, modify as needed
        description: "", // Keep this void as specified
        category: expense.nature,
        amount: `$${expense.priceInUSD?.toFixed(2) || '0.00'} USD`, // Total price in USD with the USD icon
    }));
}