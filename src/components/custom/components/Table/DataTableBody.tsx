import { Table as TanstackTable, flexRender } from "@tanstack/react-table";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

interface DataTableBodyProps<T> {
  table: TanstackTable<T>;
}

export function DataTableBody<T>({ table }: DataTableBodyProps<T>) {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className="px-4 py-3 text-center">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={table.getAllColumns().length}
            className="h-24 text-center"
          >
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
