import { Accommodation } from "@/type"; 
import { ColumnDef } from "@tanstack/react-table";
import { format } from 'date-fns';

const formatDateCell = (props: any) => {
  const dateValue = props.getValue();
  return <span>{dateValue ? format(dateValue, "EEE MMM dd yyyy HH:mm:ss") : ''}</span>;
};

export const accommodationColumns: ColumnDef<Accommodation>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "travelerUserId",
    header: "Traveler ",
  },
  {
    accessorKey: "relatedTripTravelId",
    header: "Related Trip ",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "checkInDate",
    header: "Check-In Date",
    cell: formatDateCell,
  },
  {
    accessorKey: "checkOutDate",
    header: "Check-Out Date",
    cell: formatDateCell,
  },
  {
    accessorKey: "totalCost",
    header: "Total Cost",
  },
  {
    accessorKey: "bookingConfirmationDocument",
    header: "Booking Confirmation Document",
  },
  // Additional columns for createdAt and updatedAt if needed
  
];
