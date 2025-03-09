import { Table } from "@tanstack/react-table";

interface DataTableSelectionInfoProps<T> {
  table: Table<T>;
}

export function DataTableSelectionInfo<T>({
  table,
}: DataTableSelectionInfoProps<T>) {
  return (
    <div className="flex-1 text-sm text-muted-foreground">
      {table.getFilteredSelectedRowModel().rows.length} of{" "}
      {table.getFilteredRowModel().rows.length} row(s) selected.
    </div>
  );
}
