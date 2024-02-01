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
    header: 'Passport N',
  },
  {
    accessorKey: 'dateOfBirth',
    header: 'Date of Birth',
    cell: formatDateCell,
  },

  {
    accessorKey: 'validFrom',
    header: 'Valid from',
    cell: formatDateCell,
  },
  {
    accessorKey: 'expiry',
    header: 'Expiry date',
    cell: formatDateCell,
  },
  {
    accessorKey: 'nationality',
    header: 'Nationality',
  },
  {
    accessorKey: 'passportReference',
    header: 'PDF',
    cell: (props) => {
      const link = props.getValue() as string;

      return (
        <span>
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer">
              See
            </a>
          ) : (
            'Not uploaded'
          )}
        </span>
      );
    },
  },
];
