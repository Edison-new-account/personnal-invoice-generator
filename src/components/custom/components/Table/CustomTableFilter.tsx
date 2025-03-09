import { Table } from "@tanstack/react-table";
import { DataTableFilterInput } from "./DataTableFilterInput";
import { DataTableColumnToggle } from "./DataTableColumnToggle";

interface DataTableFilterProps<T> {
  table: Table<T>;
  filtrableColumns: string[]; // Ajout de la prop filtrableColumns
}

export function CustomTableFilter<T>({
  table,
  filtrableColumns,
}: DataTableFilterProps<T>) {
  return (
    <div className="flex items-center py-4">
      <DataTableFilterInput
        table={table}
        filtrableColumns={filtrableColumns}
        placeholder={`Filter ${filtrableColumns.join(", ")}...`}
      />
      <DataTableColumnToggle table={table} />
    </div>
  );
}
