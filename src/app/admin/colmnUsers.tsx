
import { User, Visa } from '@/interfaces';
import { Accommodation } from '@/type';
import { ColumnDef } from '@tanstack/react-table';

import { parseISO, format } from 'date-fns';

const formatDateCell = (props: any) => {
  const dateValue = props.getValue();
  const date = typeof dateValue === 'string' ? parseISO(dateValue) : dateValue;
  return <span>{dateValue ? format(date, 'MMM dd yyyy ') : ''}</span>;
};

export const ColumnUserAdmin: ColumnDef<User>[] = [
  {
    accessorKey: 'fullName',
    header: 'Name',
    cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`,
  },
  {
    accessorKey: 'position',
    header: 'Position',
 
  },

  {
    accessorKey: 'officeLocation',
    header: 'Office Location',
  
  },
 
];
