"use client";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "./types";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DateTime } from "luxon";

export const columns: ColumnDef<User>[] = [
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
];
