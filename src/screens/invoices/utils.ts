import { IColumn } from "@/components/custom/components/Table/utils";
import { format } from "date-fns/format";

export interface IInvoiceTable {
  id: string;
  title: string;
  invoice_number: string;
  created_at: string;
  status: "paid" | "pending" | "draft";
  total: number;
}

export const formatDate = (date: Date, dateFormat = "MMM dd, yyyy") =>
  format(date, dateFormat);

export const getInvoiceTableColumns = (
  actions?: { label: string; onClick: (row: any) => void }[]
) => {
  const columns: IColumn[] = [
    { key: "title", title: "Title", style: "capitalize", order: true },
    {
      key: "invoice_number",
      title: "Invoice Number",
      style: "capitalize",
      order: true,
    },
    { key: "created_at", title: "Created At", type: "date", order: true },
    { key: "status", title: "Status", order: true },
    { key: "total", title: "Total", type: "currency", order: true },
    ...(actions && actions.length > 0
      ? [
          {
            key: "actions",
            title: "Actions",
            actions,
          },
        ]
      : []),
  ];
  return columns;
};
