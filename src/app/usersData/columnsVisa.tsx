import { Visa } from '@/interfaces';
import { Accommodation } from '@/type';
import { ColumnDef } from '@tanstack/react-table';

import { parseISO, format } from 'date-fns';

const formatDateCell = (props: any) => {
  const dateValue = props.getValue();
  const date = typeof dateValue === 'string' ? parseISO(dateValue) : dateValue;
  return <span>{dateValue ? format(date, 'MMM dd yyyy ') : ''}</span>;
};

export const ColumnVisas: ColumnDef<Visa>[] = [
  {
    accessorKey: 'name',
    header: 'Country',
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: formatDateCell,
  },

  {
    accessorKey: 'endDate',
    header: 'Valid until',
    cell: formatDateCell,
  },
  
 
];
