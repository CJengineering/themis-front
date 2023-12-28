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

const GreenCell = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-green-100">{children}</div>
);

const formatDateCell = (props: any) => {
  const dateValue = props.getValue();
  return (
    <span className="">
      {dateValue ? format(dateValue, 'EEE MMM dd yyyy HH:mm:ss') : ''}
    </span>
  );
};
const baseColumns: ColumnDef<Travel>[] = [
  {
    accessorKey: 'requestedDepartureDate',
    header: () => <div className="text-right ">Req. Dep. Date'</div>,
    cell: (props) => <GreenCell>{formatDateCell(props)}</GreenCell>,
  },
  {
    accessorKey: 'requestedArrivalDate',
    header: 'Req. Arr. Date',
    cell: formatDateCell,
  },
  {
    accessorKey: 'requestedDepartureCity',
    header: 'Dep. City',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: () => <Badge variant="confirmed">Confirmed</Badge>,
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'tripType',
    header: 'Trip Type',
  },
  {
    accessorKey: 'departureDateLeg1',
    header: 'Dep. Date (L1)',
    cell: formatDateCell,
  },
  {
    accessorKey: 'departureCityLeg1',
    header: 'Dep. City (L1)',
  },
  {
    accessorKey: 'arrivalCityLeg1',
    header: 'Arr. City (L1)',
  },
  {
    accessorKey: 'returnDepartureDateLeg2',
    header: 'Ret. Dep. Date (L2)',
    cell: formatDateCell,
  },
  {
    accessorKey: 'returnDepartureCityLeg2',
    header: 'Ret. Dep. City (L2)',
  },
  {
    accessorKey: 'returnArrivalCityLeg2',
    header: 'Ret. Arr. City (L2)',
  },
  {
    accessorKey: 'costOriginal',
    header: 'Orig. Cost',
  },
  {
    accessorKey: 'originalCurrency',
    header: 'Orig. Currency',
  },
  {
    accessorKey: 'costUSD',
    header: 'Cost (USD)',
  },
  {
    accessorKey: 'bookingReferenceDocument',
    header: 'Booking Ref.',
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="picture">Upload Documents</Label>
                  <Input id="picture" type="file" />
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Dialog>
                <DialogTrigger>
                  <div style={{ userSelect: 'none' }} className="inline-flex  ml-2 items-center justify-center w-8 h-8 bg-blue-500 rounded-full text-white">
                    <span className="material-icons">add</span>
                  </div>
            
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add travel informations </DialogTitle>
                    <TravelAdminForm />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },{
        accessorKey: 'id',
        header: 'Final approval',
        cell: (props) => {
          const id = props.getValue() as string;
          return <Button variant='secondary' >validate </Button>;
        },
      }
  );
}

export const travelColumns: ColumnDef<Travel>[] = baseColumns;
