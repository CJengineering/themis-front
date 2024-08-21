import { Button } from '@/components/ui/button';
import { Travel } from '@/type';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import { ArrowUpDown } from 'lucide-react';
import { Trip, TripFieldData } from '@/interfaces';

export type StatusInput =
  | 'Request'
  | 'Authentication'
  | 'Validation'
  | 'Authorisation'
  | 'Approval'
  | 'Finalisation';

const GreenCell = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-green-100">{children}</div>
);
export function mapStatusToOutput(status: StatusInput): string {
  switch (status) {
    case 'Request':
      return 'Requested';
    case 'Authentication':
      return 'Authenticated';
    case 'Validation':
      return 'Validated';
    case 'Authorisation':
      return 'Authorised';
    case 'Approval':
      return 'Approved';
    case 'Finalisation':
      return 'Finalised';
    default:
      return 'Unknown';
  }
}
export function mapStatusToSteps(status: StatusInput): string {
  switch (status) {
    case 'Request':
      return 'Authentication';
    case 'Authentication':
      return 'Validation';
    case 'Validation':
      return 'Athorisation';
    case 'Authorisation':
      return 'Approval';
    case 'Approval':
      return 'Finalisation';
    case 'Finalisation':
      return 'Finalised';
    default:
      return 'Unknown';
  }
}
const formatDateCell = (props: any) => {
  const dateValue = props.getValue();
  return (
    <span className="">
      {dateValue ? format(dateValue, 'MMM dd yyyy ') : ''}
    </span>
  );
};
const baseColumns: ColumnDef<Trip>[] = [
  {
    accessorKey: 'name',
    header: 'Trip',
  },
  {
    accessorKey: 'userFullName',
  
    header: 'Traveller',
  },

  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          style={{ padding: '0px' }}
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (props) => (
      <Badge
        variant={
          props.getValue() as
            | 'default'
            | 'secondary'
            | 'destructive'
            | 'outline'
            | 'confirmed'
            | 'inProgress'
            | 'waitingValidation'
            | 'Request'
            | 'Authentication'
            | 'Validation'
            | 'Authorisation'
            | 'Approval'
            | 'Finalisation'
        }
      >
        {mapStatusToOutput(props.getValue() as StatusInput)}
      </Badge>
    ),
  },

 
  {
    accessorKey: 'departureCity',
    header: 'From',
  },
  {
    accessorKey: 'arrivalCity',
    header: 'To',
  },

  {
    accessorKey: 'departureDate',
    header: ({ column }) => {
      return (
        <Button
          style={{ padding: '0px' }}
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Departing
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: formatDateCell,
  },
  {
    accessorKey: 'returnDate',
    header: 'Returning',
    cell: formatDateCell,
  },
  {
    accessorKey: 'costOriginal',
    header: 'Cost ',
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
  }
  ,
  
];

export const travelColumns: ColumnDef<Trip>[] = baseColumns;
