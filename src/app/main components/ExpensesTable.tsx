import React from 'react';
import ExpenseRow from './ExpenseRow';
import { Expense } from '@/interfaces';

const expenseData: Expense[] = [
  {
    id: 1,
    date: 'Today',
    description: 'Mc Donalds',
    category: 'Food',
    amount: '£20.00',
    time: '11:21AM',
  },
  {
    id: 2,
    date: 'Today',
    description: 'Taxi Ride',
    category: 'Transport',
    amount: '£15.00',
    time: '12:00PM',
  },
  {
    id: 3,
    date: '03 April 2024',
    description: 'Office Chair',
    category: 'Furniture',
    amount: '£50.00',
    time: '10:00AM',
  },
  {
    id: 4,
    date: '03 April 2024',
    description: 'Coffee',
    category: 'Food',
    amount: '£3.00',
    time: '09:00AM',
  },
  {
    id: 5,
    date: '03 April 2024',
    description: 'Miscellaneous',
    category: 'Other',
    amount: '£10.00',
    time: '08:30AM',
  },
];

const ExpensesTable: React.FC = () => {
  return (
    <div>
      <h6>Today, 04 April</h6>
      {expenseData.filter(expense => expense.date === 'Today').map(expense => (
        <ExpenseRow key={expense.id} expense={expense} />
      ))}
      <div className="mt-2">
        <h6>03 April 2024</h6>
        {expenseData.filter(expense => expense.date === '03 April 2024').map(expense => (
          <ExpenseRow key={expense.id} expense={expense} />
        ))}
      </div>
    </div>
  );
};

export default ExpensesTable;
