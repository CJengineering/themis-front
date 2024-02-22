import { Mile, Transaction } from '@/interfaces';

import { ColumnDef } from '@tanstack/react-table';

export const ColumnTransactions: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'transactionDate',
    header: 'Date',
  },
  {
    accessorKey: 'amount',
    header: 'Ammount',
    cell: (props) => {
        const value = props.getValue();
        // Ensure the value is a number before formatting
        const numericValue = value ? Number(value) : 0; // Convert value to number, default to 0 if falsy
        const formattedValue = numericValue ? new Intl.NumberFormat('en-GB', {
          style: 'currency',
          currency: 'GBP',
          minimumFractionDigits: 2,
        }).format(numericValue) : '';
        
        return <>{formattedValue}</>;
      },
  },
];
