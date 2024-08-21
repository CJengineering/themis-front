import { Expense } from '@/interfaces';
import React from 'react';
import { ExpensesForm } from './ExpensesFormUI';

interface ExpenseRowProps {
  expense: Expense;
}

const ExpenseRow: React.FC<ExpenseRowProps> = ({ expense }) => {
  const renderIcon = (category: string) => {
    switch (category) {
      case 'Food':
        return <span className="material-icons text-3xl">restaurant</span>;
      case 'Transport':
        return <span className="material-icons text-3xl">directions_car</span>;
      case 'Furniture':
        return <span className="material-icons text-3xl">weekend</span>;
      case 'Other':
        return <span className="material-icons text-3xl">attach_money</span>;
      default:
        return <span className="material-icons text-3xl">money</span>;
    }
  };

  return (
    <div className={`bg-${expense.date === 'Today' ? 'gray' : 'blue'}-100 mt-2 p-4 grid grid-cols-12`}>
      <div className="col-span-2 flex items-center">
        {renderIcon(expense.category)}
      </div>
      <div className="col-span-5">
        <h3 className="text-xl font-semibold">{expense.description}</h3>
        <p className="text-sm text-gray-500">{expense.time}</p>
      </div>
      <div className="col-span-3">
        <p className="mt-2 text-lg font-bold">{expense.amount}</p>
      </div>
      <div className="col-span-2 flex items-center">
        <ExpensesForm />
      </div>
    </div>
  );
};

export default ExpenseRow;
