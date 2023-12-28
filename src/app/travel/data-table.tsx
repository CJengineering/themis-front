import {
  Cell,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Header
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const getCellClassName = (cell: Cell<TData, TValue>) => {
    switch (cell.column.id) {
      case 'requestedDepartureDate':
      case 'requestedArrivalDate':
      case 'requestedDepartureCity':
      case 'requestedArrivalCity':
        return 'bg-green-100';
      case 'arrivalCityLeg1':
      case 'returnDateLeg1':
      case 'departureDateLeg1':
      case 'departureCityLeg1':
      case 'returnDepartureDateLeg2':
      case 'returnDepartureCityLeg2':
      case 'returnArrivalCityLeg2':
        return 'bg-orange-100';
      default:
        return '';
    }
  };
  const getCellClassNameHeader = (header: Header<TData,TValue>) => {
    switch (header.column.id) {
      case 'requestedDepartureDate':
      case 'requestedArrivalDate':
      case 'requestedDepartureCity':
      case 'requestedArrivalCity':
        return 'bg-green-300';
      case 'arrivalCityLeg1':
      case 'returnDateLeg1':
      case 'departureDateLeg1':
      case 'departureCityLeg1':
      case 'returnDepartureDateLeg2':
      case 'returnDepartureCityLeg2':
      case 'returnArrivalCityLeg2':
        return 'bg-orange-300';
      default:
        return 'bg-gray-300';
    }
  };
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className={getCellClassNameHeader(header as Header<TData, TValue>)}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={getCellClassName(cell)}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
