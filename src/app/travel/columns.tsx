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
export type StatusInput = "Request" | "Authentication" | "Validation" | "Approval" | "Finalisation";


const GreenCell = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-green-100">{children}</div>
);
export function mapStatusToOutput(status: StatusInput): string {
  switch (status) {
    case "Request":
      return "Requested";
    case "Authentication":
      return "Authenticated";
    case "Validation":
      return "Validated";
    case "Approval":
      return "Approved";
    case "Finalisation":
      return "Finalised";
    default:
      return "Unknown";
  }
}
export function mapStatusToSteps(status: StatusInput): string {
  switch (status) {
    case "Request":
      return "Authentication";
    case "Authentication":
      return "Validation";
    case "Validation":
      return "Approval";
    case "Approval":
      return "Finalisation";
    case "Finalisation":
      return "Finalised";
    default:
      return "Unknown";
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
        {mapStatusToOutput(props.getValue() as StatusInput)}
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
      if (typeof bookingReference === 'string' && bookingReference) {
        return (
          <a href={bookingReference} target="_blank" rel="noopener noreferrer">
            <span className="material-symbols-outlined cursor-pointer hover:text-gray-200">download</span>
          </a>
        );
      }
      return null; // Or return a placeholder or empty content if needed
    },
  },
];




export const travelColumns: ColumnDef<Travel>[] = baseColumns;
