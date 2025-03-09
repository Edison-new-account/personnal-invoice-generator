import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface IColumn {
  key: string;
  title: string;
  order?: boolean;
  hide?: boolean;
  type?: "text" | "number" | "date" | "currency";
  style?: "uppercase" | "capitalize" | "lowercase";
  resizable?: boolean;
  actions?: Array<{
    label: string;
    onClick: (rowData: any) => void;
  }>;
}

// Fonction générique pour transformer IColumn en ColumnDef
export function createColumnDef<T>(column: IColumn): ColumnDef<T> {
  const baseColumn: ColumnDef<T> = {
    id: column.key,
    accessorKey: column.key,
    header: ({ column: col }) => {
      if (column.order) {
        return (
          <Button
            variant="ghost"
            onClick={() => col.toggleSorting(col.getIsSorted() === "asc")}
          >
            {column.title}
            <ArrowUpDown />
          </Button>
        );
      }
      return column.title;
    },
    cell: ({ row }) => {
      let value: any = row.getValue(column.key);

      switch (column.type) {
        case "currency":
          value = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(Number(value));
          break;
        case "date":
          value = new Date(value as string).toLocaleDateString();
          break;
        case "number":
          value = Number(value).toLocaleString();
          break;
      }

      switch (column.style) {
        case "uppercase":
          return <div className="uppercase">{value}</div>;
        case "capitalize":
          return <div className="capitalize">{value}</div>;
        case "lowercase":
          return <div className="lowercase">{value}</div>;
        default:
          return <div>{value}</div>;
      }
    },
    enableHiding: column.hide !== false,
    enableSorting: column.order === true,
    enableResizing: column.resizable === true,
  };

  // Si la colonne a des actions et que c'est la colonne "actions"
  if (column.key === "actions" && column.actions) {
    return {
      ...baseColumn,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {column.actions?.map((action, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => action.onClick(row.original)}
              >
                {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    };
  }

  return baseColumn;
}

// Fonction générique pour la colonne de sélection
export function createSelectColumn<T>(): ColumnDef<T> {
  return {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };
}
