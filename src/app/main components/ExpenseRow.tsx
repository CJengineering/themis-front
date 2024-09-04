import { Expense } from '@/interfaces';
import React from 'react';
import { ExpensesForm } from './ExpensesFormUI';
import { useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { fetchSingleTrip } from '../features/trip/fetchTrip';
import { createPresentationUrl2 } from '../features/Presentations';

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
      case 'Supplies':
        return <span className="material-icons text-3xl">weekend</span>;
      case 'Other':
        return <span className="material-icons text-3xl">attach_money</span>;
      default:
        return <span className="material-icons text-3xl">money</span>;
    }
  };
  const {toast}=useToast()
  const {tripId} = useParams()
  const dispatch= useAppDispatch()
  const url2 = useAppSelector(createPresentationUrl2)

  const handleSubmit = async () => {
    const submissionData = {
      action: { type: 'removeExpense', data: { expenseId: expense.id } },
      fieldData: {},
    };
  
    console.log('Submitting data:', submissionData);
  
    try {
      const response = await fetch(`${url2}/trips/${tripId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
  
      if (response.ok) {
        console.log('Expense deleted successfully');
        toast({
          title: 'Expense deleted successfully',
          description: 'The expense has been deleted',
     
        });
        await dispatch<any>(
          fetchSingleTrip(`${url2}/trips/${tripId}`)
        );
        // Reload the page after successful deletion
      } else {
        const errorData = await response.json();
        console.error('Failed to delete flight:', response.statusText, errorData);
      }
    } catch (error) {
      console.error('Error deleting flight:', error);
    }
  };

  return (
    <div className={`bg-${expense.date === 'Today' ? 'gray' : 'blue'}-100 mt-2 p-4 grid grid-cols-12`}>
      <div className="col-span-2 flex items-center">
        {renderIcon(expense.category)}
      </div>
      <div className="col-span-5">
        <h3 className="text-xl font-semibold">{expense.category}</h3>
       
      </div>
      <div className="col-span-3">
        <p className="mt-2 text-lg font-bold">{expense.amount}</p>
      </div>
      <div className="col-span-2 flex items-center">
        <span className="material-icons hover:text-red-800 hover:cursor-pointer" onClick={handleSubmit}>delete</span>
      </div>
    </div>
  );
};

export default ExpenseRow;
