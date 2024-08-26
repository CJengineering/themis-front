import React, { useEffect } from 'react';
import ExpenseRow from './ExpenseRow';
import { Expense } from '@/interfaces';
import { createPresentationSingleTrip } from '../features/Presentations';
import { useAppSelector } from '../features/hooks';
import { map } from 'zod';
import { mapExpenses } from '@/lib/mappers/mapperExpense';

const expenseData: Expense[] = [
  {
    id: 1,
    date: 'Today',
    description: 'Mc Donalds',
    category: 'Food',
    amount: '£20.00',
   
  },
  {
    id: 2,
    date: 'Today',
    description: 'Taxi Ride',
    category: 'Transport',
    amount: '£15.00',

  },
  {
    id: 3,
    date: '03 April 2024',
    description: 'Office Chair',
    category: 'Furniture',
    amount: '£50.00',
   
  },
  {
    id: 4,
    date: '03 April 2024',
    description: 'Coffee',
    category: 'Food',
    amount: '£3.00',
   
  },
  {
    id: 5,
    date: '03 April 2024',
    description: 'Miscellaneous',
    category: 'Other',
    amount: '£10.00',

  },
];

const ExpensesTable: React.FC = () => {

  const trip = useAppSelector(createPresentationSingleTrip);

  const dataExpenses = trip.expenses;
  const processedExpenses = mapExpenses(dataExpenses);
  return (
    <div>
 
      <div className="mt-2">
       
        {processedExpenses.map(expense => (
          <ExpenseRow key={expense.id} expense={expense} />
        ))}
      </div>
    </div>
  );
};

export default ExpensesTable;
