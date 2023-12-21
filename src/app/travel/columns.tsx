import { Travel } from "@/type";
import { ColumnDef } from "@tanstack/react-table";
import { format } from 'date-fns';
const formatDateCell = (props: any) => {
    const dateValue = props.getValue();
    return <span>{dateValue ? format(dateValue, "EEE MMM dd yyyy HH:mm:ss") : ''}</span>;
  };

export const travelColumns: ColumnDef<Travel>[] = [
    {
        accessorKey: "name",
        header: "Name",
        
      },
      {
        accessorKey: "tripType",
        header: "Trip Type",
      },
      {
        accessorKey: "departureDateLeg1",
        header: "Departure Date (Leg 1)",
        cell: formatDateCell,
        
      },
      {
        accessorKey: "departureCityLeg1",
        header: "Departure City (Leg 1)",
      },
      {
        accessorKey: "arrivalCityLeg1",
        header: "Arrival City (Leg 1)",
      },
      {
        accessorKey: "returnDepartureDateLeg2",
        header: "Return Departure Date (Leg 2)",
        cell: formatDateCell,
      },
      {
        accessorKey: "returnDepartureCityLeg2",
        header: "Return Departure City (Leg 2)",
        
      },
      {
        accessorKey: "returnArrivalCityLeg2",
        header: "Return Arrival City (Leg 2)",
      },
      {
        accessorKey: "costOriginal",
        header: "Original Cost",
      },
      {
        accessorKey: "originalCurrency",
        header: "Original Currency",
      },
      {
        accessorKey: "costUSD",
        header: "Cost (USD)",
      },
      {
        accessorKey: "bookingReferenceDocument",
        header: "Booking Reference Document",
      },
 
];
