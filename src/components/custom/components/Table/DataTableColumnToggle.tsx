import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Table } from "@tanstack/react-table";

interface DataTableColumnToggleProps<T> {
  table: Table<T>;
}

export function DataTableColumnToggle<T>({
  table,
}: DataTableColumnToggleProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          Columns <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide() || column.getIsVisible())
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
