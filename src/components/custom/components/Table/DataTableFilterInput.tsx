import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface DataTableFilterInputProps<T> {
  table: Table<T>;
  placeholder?: string;
  filtrableColumns: string[];
}

export function DataTableFilterInput<T>({
  table,
  placeholder = "Rechercher...",
  filtrableColumns,
}: DataTableFilterInputProps<T>) {
  const [filterValue, setFilterValue] = useState("");

  // Appliquer le filtre à toutes les colonnes spécifiées
  useEffect(() => {
    filtrableColumns.forEach((columnKey) => {
      const column = table.getColumn(columnKey);
      if (column) {
        column.setFilterValue(filterValue);
      }
    });
  }, [filterValue, table, filtrableColumns]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };
  return (
    <Input
      placeholder={placeholder}
      value={filterValue}
      onChange={handleChange}
      className="max-w-sm"
    />
  );
}
