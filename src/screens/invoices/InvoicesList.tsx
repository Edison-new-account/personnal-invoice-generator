import { DataTableDemo } from "@/components/custom/components/Table/CustomTable";
import { IColumn } from "@/components/custom/components/Table/utils";
import { formatDate, getInvoiceTableColumns, IInvoiceTable } from "./utils";
import { useDispatch, useSelector } from "@/hooks/hooks";
import { getAllInvoices } from "@/store/selectors/invoices";
import { Invoice, InvoiceTemplate } from "@/lib/models";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "@/routes/path";
import { toast } from "sonner";
import { deleteInvoice } from "@/store/slices/invoiceSlice";

interface InvoicesListProps {
  setCurrentInvoice?: (invoice: Invoice) => void;
}
const InvoicesList = ({ setCurrentInvoice }: InvoicesListProps) => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const invoices = useSelector(getAllInvoices);

  const columns: IColumn[] = getInvoiceTableColumns([
    {
      label: "View Details",
      onClick: (rowData) => console.log("View:", rowData),
    },
    {
      label: "Edit",
      onClick: (rowData) => {
        const invoiceTemplate = invoices.find((i) => i.id === rowData.id);

        if (!invoiceTemplate) {
          toast.error("Invoice error", {
            description: "Impossible to find the invoice",
            duration: 2000,
          });
          return;
        }

        setCurrentInvoice?.(invoiceTemplate.invoice);

        if (ROUTE_PATHS.INVOICE.EDIT) {
          const path = ROUTE_PATHS.INVOICE.EDIT.replace(":id", rowData.id);
          navigateTo(path);
        }
      },
    },
    {
      label: "Delete",
      onClick: (rowData) => {
        const invoiceTemplate = invoices.find((i) => i.id === rowData.id);

        if (!invoiceTemplate) {
          toast.error("Invoice error", {
            description: "Impossible to find the invoice",
            duration: 2000,
          });
          return;
        }

        dispatch(deleteInvoice(invoiceTemplate.id));

        toast.success("Invoice deleted", {
          description: "The invoice has been deleted successfully",
          duration: 2000,
        });
      },
    },
  ]);

  const getFormattedData = (templates: InvoiceTemplate[]): IInvoiceTable[] => {
    return templates.map((template) => {
      const { id, created_at, status, invoice } = template;

      return {
        id,
        created_at: formatDate(created_at),
        status,
        title: invoice.label.title,
        invoice_number: invoice.header.invoice.number,
        total: `${invoice.body.total}`,
        currency: invoice.header.invoice.currency,
      };
    });
  };

  return (
    <DataTableDemo<IInvoiceTable>
      columns={columns}
      data={getFormattedData(invoices)}
      filtrableColumns={["title"]}
    />
  );
};
export default InvoicesList;
