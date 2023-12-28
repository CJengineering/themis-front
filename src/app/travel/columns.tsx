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
    cell: () => <Badge variant="confirmed">Confirmed</Badge>,
  },

  {
    accessorKey: 'tripType',
    header: 'Round Trip',
    cell: (props) => {
      const tripType = props.getValue() as string;
      return <span>{tripType ? 'Yes' : 'No'}</span>;
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
    header: 'Departing)',
    cell: formatDateCell,
  },
  {
    accessorKey: 'returnDate',
    header: 'Returning',
    cell: formatDateCell,
  },
  {
    accessorKey: 'costOriginal',
    header: 'Cost (GBP)',
    cell: (props) => {
      const value = props.getValue();
      return <>{value ? `£${value}` : ''}</>;
    },
  },
  {
    accessorKey: 'bookingReferenceDocument',
    header: 'Reference',
    cell: () => <Badge variant="outline">See ref</Badge>,
  },
];
if (localStorage.getItem('user-id') === '1') {
  baseColumns.push(
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const payment = row.original;
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
                <DialogTitle>Update Trip</DialogTitle>
                <DialogDescription>
                  Update the fields below to finalise before requesting the
                  travellers validation
                </DialogDescription>
             
                <TravelAdminForm />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        );
      },
    },
    {
      accessorKey: 'id',
      header: 'Final approval',
      cell: (props) => {
        const id = props.getValue() as string;
        return <div className='flex gap-2 '><Button variant="secondary">validate </Button><Button variant="secondary" style={{backgroundColor:'red', color:'white'}}>decline</Button></div>
      },
    }
  );
}

export const travelColumns: ColumnDef<Travel>[] = baseColumns;
