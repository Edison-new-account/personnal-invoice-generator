import { useDispatch, useSelector } from "@/hooks/hooks";
import { IInvoiceTable } from "./utils";
import { getAllInvoices } from "@/store/selectors/invoices";
import { toast } from "sonner";
import { updateInvoice } from "@/store/slices/invoiceSlice";
import _ from "lodash";
import { INVOICE_STATUS } from "@/lib/models";

interface InvoiceStatusProps {
  row: IInvoiceTable;
  onStatusChange?: (row: IInvoiceTable, newStatus: string) => void;
}

const InvoiceStatus = ({ row, onStatusChange }: InvoiceStatusProps) => {
  const invoices = useSelector(getAllInvoices);
  const dispatch = useDispatch();

  const invoiceTemplate = invoices.find((i) => i.id === row.id);

  const status = row.status?.toLowerCase();
  const statusOptions = _.keys(INVOICE_STATUS);
  let badgeStyle: React.CSSProperties = {
    padding: "4px 8px",
    borderRadius: "4px",
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;

    if (!invoiceTemplate) {
      toast.error("Invoice error", {
        description: "Impossible to find the invoice",
        duration: 2000,
      });
      return;
    }

    dispatch(
      updateInvoice({
        invoice: invoiceTemplate.invoice,
        id: invoiceTemplate.id,
        status: newStatus as INVOICE_STATUS,
        created_at: invoiceTemplate.created_at,
      })
    );

    if (onStatusChange) {
      onStatusChange(row, newStatus);
    }
  };

  switch (status) {
    case "paid":
      badgeStyle = {
        ...badgeStyle,
        backgroundColor: "#d4edda",
        color: "#155724",
      };
      break;
    case "pending":
      badgeStyle = {
        ...badgeStyle,
        backgroundColor: "#fff3cd",
        color: "#856404",
      };
      break;
    case "draft":
      badgeStyle = {
        ...badgeStyle,
        backgroundColor: "#cce5ff",
        color: "#004085",
      };
      break;
    default:
      badgeStyle = {
        ...badgeStyle,
        backgroundColor: "#f8d7da",
        color: "#721c24",
      };
      break;
  }

  return (
    <>
      <select
        value={status}
        onChange={handleChange}
        style={{
          padding: "4px 8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          backgroundColor: "#fff",
          cursor: "pointer",
          minWidth: "100px",
          ...badgeStyle,
        }}
      >
        {statusOptions.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}{" "}
            {/* Capitalisation */}
          </option>
        ))}
      </select>
      {/* <div style={badgeStyle}>{row.status}</div>; */}
    </>
  );
};
export default InvoiceStatus;
