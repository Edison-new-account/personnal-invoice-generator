import { Table as TanstackTable, flexRender } from "@tanstack/react-table";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DataTableHeaderProps<T> {
  table: TanstackTable<T>;
}

export function DataTableHeader<T>({ table }: DataTableHeaderProps<T>) {
  return (
    <TableHeader
      className="sticky top-0 z-10 bg-white border-b"
      style={{ boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.05)" }}
    >
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center bold"
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}
