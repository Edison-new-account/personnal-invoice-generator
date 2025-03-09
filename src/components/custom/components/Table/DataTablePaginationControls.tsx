import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";

interface DataTablePaginationControlsProps<T> {
  table: Table<T>;
}

export function DataTablePaginationControls<T>({
  table,
}: DataTablePaginationControlsProps<T>) {
  return (
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
  );
}
