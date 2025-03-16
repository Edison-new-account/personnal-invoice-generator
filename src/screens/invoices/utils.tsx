import { IColumn } from "@/components/custom/components/Table/utils";
import { format } from "date-fns/format";
import InvoiceStatus from "./InvoiceStatus";
import { INVOICE_STATUS } from "@/lib/models";

export interface IInvoiceTable {
  id: string;
  title: string;
  invoice_number: string;
  created_at: string;
  status: INVOICE_STATUS;
  total: string;
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
    {
      key: "status",
      title: "Status",
      type: "component", // Changement du type en "component"
      order: true,
      component: (rowData) => <InvoiceStatus row={rowData} />,
    },
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
