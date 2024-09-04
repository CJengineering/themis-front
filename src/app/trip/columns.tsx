import { Button } from '@/components/ui/button';
import { Travel } from '@/type';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import { ArrowUpDown } from 'lucide-react';
import { Trip, TripData, TripFieldData } from '@/interfaces';

export type StatusInput =
'Saved'
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
    case 'Saved':
      return 'Saved';
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
// const formatDateCell = (props: any) => {
//   const dateValue = props.getValue();
//   return (
//     <span className="">
//       {dateValue ? format(dateValue, 'MMM dd yyyy ') : ''}
//     </span>
//   );
// };
const baseColumns: ColumnDef<TripData>[] = [
  {
    accessorKey: 'name',
    header: 'Trip',
  },
  {
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    id: 'lastName',
    header: 'Traveller',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: (props) => {
      const value = props.getValue<string>();
      const date = new Date(value);
      return date ? <>{format(date, 'MMM dd yyyy ')}</> : 'Invalid date';
    },
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
    accessorKey: 'priceTotal',
    header: 'Cost',
    cell: (props) => {
      const value = props.getValue<number>();
      const formattedValue = value
        ? new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
          }).format(value)
        : '';
      return <>{formattedValue}</>;
    },
  },
];



export const tripColumns: ColumnDef<TripData>[] = baseColumns;
