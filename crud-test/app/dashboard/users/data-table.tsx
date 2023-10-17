"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import AddDialog from "./add-dialog";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "react-query";
import { User } from "./types";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { DateTime } from "luxon";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ViewDialog } from "./view-dialog";
import { DeleteDialog } from "./delete-dialog";
import EditDialog from "./edit-dialog";

export const columns = <TData, TValue = any>(
  onRowClick: (id: number, action: string) => void
): ColumnDef<TData, TValue>[] => [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return (
          <div className="ml-4">
            {row.getValue("id")}
          </div>
        )
      }
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tanggal Input
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const createdAt = row.getValue("created_at") as string;
        const wibDate = DateTime.fromISO(createdAt, { zone: 'UTC' }).setZone('Asia/Jakarta');
        const wibDateInIndonesian = wibDate.setLocale('id');
        const formattedDate = wibDateInIndonesian.toFormat('EEEE, dd MMMM yyyy, HH:mm');

        return (
          <div>
            {formattedDate}
          </div>
        );
      }
    },
    {
      accessorKey: "name",
      header: "Nama",
    },
    {
      accessorKey: "gender",
      header: "Jenis Kelamin",
      cell: ({ row }) => {
        return (
          <div className="">
            {row.getValue("gender") === "l" ? "Laki-Laki" : "Perempuan"}
          </div>
        )
      }
    },
    {
      accessorKey: "born_date",
      header: "Born Date",
      cell: ({ row }) => {
        const bornDate = row.getValue("born_date") as string;
        const date = DateTime.fromISO(bornDate, { zone: 'UTC' });
        const dateInIndonesian = date.setLocale('id');
        const formattedDate = dateInIndonesian.toFormat('EEEE, dd MMMM yyyy');

        return (
          <div>
            {formattedDate}
          </div>
        );
      }
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original as User;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onRowClick(user.id, 'view')}>
                View Customer Info
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRowClick(user.id, 'edit')}>
                Edit Customer Info
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onRowClick(user.id, 'delete')} className="bg-red-200">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ];

interface DataTableProps<TData, TValue> {
  data: TData[];
}

const queryClient = new QueryClient();

export function DataTable<TData, TValue>({
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [rowSelection, setRowSelection] = React.useState({})
  const [selectedRowView, setSelectedRowView] = useState<null | number>(null);
  const [actionType, setActionType] = useState<string | null>(null);

  const handleRowClick = (id: number, action: string) => {
    setSelectedRowView(id);
    setActionType(action);
  };
  const table = useReactTable({
    data,
    columns: columns<TData>(handleRowClick),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <QueryClientProvider client={queryClient}>
        {openAddDialog && (
          <AddDialog
            open={openAddDialog}
            onOpenChange={(openAddDialog) => {
              if (openAddDialog) return;
              setOpenAddDialog(false);
              router.refresh();
            }}
          />
        )}
        {selectedRowView && actionType === 'view' && (
          <ViewDialog
            userId={selectedRowView}
            open={!!selectedRowView}
            onOpenChange={(selectedRowView) => {
              if (selectedRowView) return;
              setSelectedRowView(null);
              router.refresh();
            }}
          />)
        }
        {selectedRowView && actionType === 'delete' && (
          <DeleteDialog
            userId={selectedRowView}
            open={!!selectedRowView}
            onOpenChange={(selectedRowView) => {
              if (selectedRowView) return;
              setSelectedRowView(null);
              router.refresh();
            }}
          />)
        }
        {selectedRowView && actionType === 'edit' && (
          <EditDialog
            userId={selectedRowView}
            open={!!selectedRowView}
            onOpenChange={(selectedRowView) => {
              if (selectedRowView) return;
              setSelectedRowView(null);
              router.refresh();
            }}
          />)
        }
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter Nama..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="flex grow"></div>
          <Button variant="outline" onClick={() => setOpenAddDialog(true)}>
            Tambah Pengguna
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </QueryClientProvider>
    </div>
  )
}