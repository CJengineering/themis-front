
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
    header: 'Date of issue',
    cell: formatDateCell,
  },

  {
    accessorKey: 'endDate',
    header: 'Date of expiry',
    cell: formatDateCell,
  },
  {
    accessorKey: 'number',
    header: 'Number',
  },
];
