import { Passport } from '@/interfaces';
import { Accommodation } from '@/type';
import { ColumnDef } from '@tanstack/react-table';

import { parseISO, format } from 'date-fns';

const formatDateCell = (props: any) => {
  const dateValue = props.getValue();
  // Ensure dateValue is a string and parse it into a Date object
  const date = typeof dateValue === 'string' ? parseISO(dateValue) : dateValue;
  // Format the date or return an empty string if dateValue is falsy
  return <span>{dateValue ? format(date, 'MMM dd yyyy ') : ''}</span>;
};

export const ColumnPassports: ColumnDef<Passport>[] = [
  {
    accessorKey: 'passportNumber',
    header: 'Number',
  },
  {
    accessorKey: 'dateOfBirth',
    header: 'Date of birth',
    cell: formatDateCell,
  },

  {
    accessorKey: 'validFrom',
    header: 'Date of issue',
    cell: formatDateCell,
  },
  {
    accessorKey: 'expiry',
    header: 'Date of expiry',
    cell: formatDateCell,
  },
  {
    accessorKey: 'nationality',
    header: 'Nationality',
  }
 
];
