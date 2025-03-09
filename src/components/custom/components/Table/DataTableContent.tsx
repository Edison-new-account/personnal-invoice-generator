import { Table as TanstackTable } from "@tanstack/react-table";
import { Table } from "@/components/ui/table";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableBody } from "./DataTableBody";

interface DataTableContentProps<T> {
  table: TanstackTable<T>;
}

export function DataTableContent<T>({ table }: DataTableContentProps<T>) {
  return (
    <div className="rounded-md border">
      <Table>
        <DataTableHeader table={table} />
        <DataTableBody table={table} />
      </Table>
    </div>
  );
}
