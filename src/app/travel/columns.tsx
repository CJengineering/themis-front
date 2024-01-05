import { Button } from '@/components/ui/button';
import { Travel } from '@/type';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TravelAdminForm } from '../main components/TravelAdminForm';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TravelRows } from '../features/Presentations';

const GreenCell = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-green-100">{children}</div>
);

const formatDateCell = (props: any) => {
  const dateValue = props.getValue();
  return (
    <span className="">
      {dateValue ? format(dateValue, 'MMM dd yyyy ') : ''}
    </span>
  );
};
const baseColumns: ColumnDef<Travel>[] = [
  {
    accessorKey: 'name',
    header: 'Trip',
  },
  {
    accessorKey: 'userFullName',
    header: 'Traveler',
  },

  {
    accessorKey: 'status',
    header: 'Status',
    cell: (props) => (
      <Badge variant={props.getValue() as "default" | "secondary" | "destructive" | "outline" | "confirmed" | "inProgress" | "waitingValidation" | "Request" | "Authentication" | "Validation" | "Approval" | "Finalisation"}>
        {props.getValue() as string}
      </Badge>
    ),
    },

  {
    accessorKey: 'tripType',
    header: 'Type',
    cell: (props) => {
      const tripType = props.getValue() as string;
      return <span>{tripType ? 'Round Trip ' : 'One way'}</span>;
    },
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
    header: 'Departing',
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
      return <>{value ? `£${value}` : ''}</>;
    },
  },
  {
    accessorKey: 'bookingReferenceDocument',
    header: 'Booking',
    cell: ({ row }) => {
      const bookingReference = row.getValue('bookingReferenceDocument');
  
      if (bookingReference) {
        return (
          <span className="material-symbols-outlined cursor-pointer hover:text-gray-200">download</span>
        );
      }
      return null; // Or return a placeholder or empty content if needed
    },
  },
];
if (true) {
  baseColumns.push(
    {accessorKey: 'id',
      id: 'actions',
      header: 'Actions',
      cell: (props) => {
    
        const id = props.getValue() as string;
        return (
          <Dialog>
            <DialogTrigger>
              <div
                style={{ userSelect: 'none' }}
                className="inline-flex  ml-2 items-center justify-center w-8 h-8 bg-blue-500 rounded-full text-white"
              >
                <span className="material-icons">add</span>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
               

                <TravelAdminForm id={id} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        );
      },
    },
    // {
    //   accessorKey: 'id',
    //   header: 'Final approval',
    //   cell: (props) => {
    //     const id = props.getValue() as string;
    //     return (
    //       <div className="flex gap-2 ">
    //         <span className="material-symbols-outlined cursor-pointer hover:text-green-500">
    //           check_circle
    //         </span>
    //         <span className="material-symbols-outlined cursor-pointer hover:text-red-500">
    //           cancel
    //         </span>
    //       </div>
    //     );
    //   },
    // }
  );
}

export const travelColumns: ColumnDef<Travel>[] = baseColumns;
