import { Invoice } from "@/lib/models";
import InvoiceBodySection from "@/screens/invoices/InvoiceBodySection";
import InvoiceDocument from "@/screens/invoices/InvoiceDocument";
import InvoiceNotFound from "@/screens/invoices/InvoiceNotFound";
import InvoicesList from "@/screens/invoices/InvoicesList";
import { Route, Routes } from "react-router";

interface InvoicePageRoutesProps {
  invoice: Invoice;
  setInvoice?: (invoice: Invoice) => void;
}

const InvoicePageRoutes = ({ invoice, setInvoice }: InvoicePageRoutesProps) => {
  return (
    <Routes>
      <Route
        path=""
        element={
          <InvoiceBodySection invoice={invoice} setInvoice={setInvoice} />
        }
      >
        <Route
          path="/"
          element={<InvoicesList setCurrentInvoice={setInvoice} />}
        />

        <Route
          path="/create"
          element={
            <InvoiceDocument invoice={invoice} setInvoice={setInvoice} />
          }
        />

        <Route
          path="/edit/:invoice_id"
          element={
            <InvoiceDocument invoice={invoice} setInvoice={setInvoice} />
          }
        />

        <Route path="/edit/:invoice_id/error" element={<InvoiceNotFound />} />
      </Route>
    </Routes>
  );
};
export default InvoicePageRoutes;
