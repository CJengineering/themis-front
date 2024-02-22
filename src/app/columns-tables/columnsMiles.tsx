import { Mile } from '@/interfaces';

import { ColumnDef } from '@tanstack/react-table';

export const ColumnMiles: ColumnDef<Mile>[] = [
  {
    accessorKey: 'companyName',
    header: 'Company Name',
  },
  {
    accessorKey: 'miles',
    header: 'Miles',
  },
];
