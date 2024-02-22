import {
  Cell,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Header,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Dialog } from '@radix-ui/react-dialog';
import {
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TravelAdminForm } from '../main components/TravelAdminForm';
import { useState } from 'react';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { createPresentationDialog } from '../features/Presentations';
import {
  closeDialog,
  openDialog,
  toggle,
} from '../features/openDialog/dialogSlice';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Passport } from '@/interfaces';
import { format, parseISO } from 'date-fns';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  dialogContentComponent:
    | React.ComponentType<{ id: string }>
    | ((props: { id: string }) => React.ReactNode);

  getColumnValue: (key: string) => string;
}

export function DataTableUser<TData, TValue>({
  columns,
  data,
  dialogContentComponent: DialogContentComponent,
  getColumnValue,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },   
  });
  const dispatch = useAppDispatch();

  const dialog = useAppSelector(createPresentationDialog);
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  const handleRowClick = (id: string) => {
    setOpenDialogId(id);
    dispatch(openDialog());
  };
  const handleCloseDialog = () => {
    dispatch(closeDialog());
  };
  const formatDateValue = (cellValue: unknown): string => {
    // Check if the value is indeed a string before formatting
    if (typeof cellValue === 'string') {
      return safelyFormatDate(cellValue);
    }
    // Handle non-string cellValue appropriately, e.g., return a default string or convert to string
    return 'Not a date'; // Or any other fallback logic
  };
  const safelyFormatDate = (dateString: string) => {
    if (!dateString) return 'Not provided'; // Handle null, undefined, or empty strings
    try {
      const date = parseISO(dateString); // Attempt to parse the string into a date object
      return format(date, 'PPP'); // Format the date
    } catch (error) {
      console.error('Failed to format date:', error);
      return 'Invalid date'; // Handle dates that cannot be parsed
    }
  };
  return (
    <div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className='whitespace-nowrap overflow-hidden overflow-ellipsis'
                    >
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
              table.getRowModel().rows.map((row) => {
                const id = (row.original as any).id;

                return (
                  <React.Fragment key={row.id}>
                    <TableRow
                      data-state={row.getIsSelected() && 'selected'}
                      onClick={() => handleRowClick(id)}
                      className="hover:cursor-pointer"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="whitespace-nowrap overflow-hidden overflow-ellipsis"
                        >
                          {flexRender(cell.column.columnDef.cell, {
                            ...cell.getContext(),
                            value: [
                              'dateOfBirth',
                              'validFrom',
                              'expiry',
                            ].includes(cell.column.id)
                              ? formatDateValue(cell.getValue())
                              : cell.getValue(),
                          })}
                        </TableCell>
                      ))}
                    </TableRow>
                    {openDialogId === id && (
                      <Dialog
                        open={dialog}
                        onOpenChange={() => setOpenDialogId(null)}
                      >
                        <DialogContent>
                          <DialogHeader>
                            {typeof DialogContentComponent === 'function' ? (
                              <DialogContentComponent id={id} />
                            ) : (
                              React.createElement(DialogContentComponent, {
                                id,
                              })
                            )}
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <TableRow>{/* ... No results handling */}</TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
