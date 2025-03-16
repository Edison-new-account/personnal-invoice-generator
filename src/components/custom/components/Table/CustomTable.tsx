import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { DataTableContent } from "./DataTableContent";
import { DataTablePagination } from "./DataTablePagination";
import { createColumnDef, createSelectColumn, IColumn } from "./utils";
import { CustomTableFilter } from "./CustomTableFilter";

interface DataTableDemoProps<T> {
  columns: IColumn[];
  data: T[];
  filtrableColumns?: string[];
}

export function DataTableDemo<T>({
  columns,
  data,
  filtrableColumns = [],
}: DataTableDemoProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const getColumnsVisibility = () => {
    const visibility: VisibilityState = {};
    columns.forEach((col) => {
      visibility[col.key] = col.hide === true ? false : true;
    });
    return visibility;
  };
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(getColumnsVisibility());
  const [rowSelection, setRowSelection] = React.useState({});

  const tableColumns: ColumnDef<T>[] = [
    createSelectColumn<T>(),
    ...columns.map((col) => createColumnDef<T>(col)),
  ];

  const table = useReactTable({
    data,
    columns: tableColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <CustomTableFilter table={table} filtrableColumns={filtrableColumns} />
      <DataTableContent table={table} />
      <DataTablePagination table={table} />
    </div>
  );
}
