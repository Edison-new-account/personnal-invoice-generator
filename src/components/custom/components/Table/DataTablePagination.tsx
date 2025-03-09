import { Table } from "@tanstack/react-table";
import { DataTableSelectionInfo } from "./DataTableSelectionInfo";
import { DataTablePaginationControls } from "./DataTablePaginationControls";

interface DataTablePaginationProps<T> {
  table: Table<T>;
}

export function DataTablePagination<T>({ table }: DataTablePaginationProps<T>) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <DataTableSelectionInfo table={table} />
      <DataTablePaginationControls table={table} />
    </div>
  );
}
