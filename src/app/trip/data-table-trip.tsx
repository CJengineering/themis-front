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
import { TravelInitiateForm } from '../main components/TravelInitiateForm';
import { TravelForm } from '../main components/TravelForm';
import { stat } from 'fs';
import { useNavigate } from 'react-router-dom';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  dialogContentComponent:
    | React.ComponentType<{ id: string }>
    | ((props: { id: string }) => React.ReactNode);
}
interface NamingColumns {
  name: string;

  status: string;
  travelType: string;
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  returnDate: string;
  costOriginal: string;

  tripType: string;
}
export function DataTableTrip<TData, TValue>({
  columns,
  data,
  dialogContentComponent: DialogContentComponent,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const navigate = useNavigate();
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
  const getCellClassNameHeader = (header: Header<TData, TValue>) => {
    switch (header.column.id) {
      case 'requestedDepartureDate':
      case 'requestedArrivalDate':
      case 'requestedDepartureCity':
      case 'requestedArrivalCity':
        return '';
      case 'arrivalCityLeg1':
      case 'returnDateLeg1':
      case 'departureDateLeg1':
      case 'departureCityLeg1':
      case 'returnDepartureDateLeg2':
      case 'returnDepartureCityLeg2':
      case 'returnArrivalCityLeg2':
        return '';
      default:
        return '';
    }
  };
  const dialog = useAppSelector(createPresentationDialog);
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);
  const namingColumns = {
    name: 'Trip',
    userFullName: 'Traveler',
    status: 'Status',
    travelType: 'Type',
    departureCity: 'From',
    arrivalCity: 'To',
    departureDate: 'Departing',
    returnDate: 'Return',
    costOriginal: 'Cost',

    tripType: 'Type',
  };
  function getColumnValue(key: string) {
    return namingColumns[key as keyof NamingColumns];
  }
  const handleRowClick = (id: string) => {
    navigate(`/trip/${id}`);
  };
  const handleCloseDialog = () => {
    dispatch(closeDialog());
  };
  const handleClose = () => {
    console.log('Form closed');
  };

  return (
    <div>
      <div className="flex ml-auto py-4">
        <Input
          placeholder="Search..."
          value={
            (table.getColumn('userFullName')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('userFullName')?.setFilterValue(event.target.value)
          }
          className="max-w-sm ml-auto"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="ml-2" variant="blue">
              New trip
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <TravelInitiateForm onClose={handleClose} />
          </DialogContent>
        </Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-2">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {getColumnValue(column.id)}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={getCellClassNameHeader(
                        header as Header<TData, TValue>
                      )}
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
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
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
