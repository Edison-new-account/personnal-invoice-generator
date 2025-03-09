import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import InvoiceActions from "./InvoiceActions";
import { Invoice } from "@/lib/models";
import { useEffect } from "react";
import { useSelector } from "@/hooks/hooks";
import { getAllInvoices } from "@/store/selectors/invoices";
import useInvoiceContext from "@/hooks/useInvoiceContext";
import _ from "lodash";

interface InvoiceBodySectionProps {
  invoice: Invoice;
  setInvoice?: (invoice: Invoice) => void;
}

const InvoiceBodySection = ({
  invoice,
  setInvoice,
}: InvoiceBodySectionProps) => {
  const invoices = useSelector(getAllInvoices);
  const navigateTo = useNavigate();
  const pathname = useLocation().pathname;
  const { invoice_id: invoiceTemplateId } = useParams();

  const invoiceContext = useInvoiceContext();

  useEffect(() => {
    if (invoiceTemplateId) {
      const invoiceTemplate = _.find(invoices, { id: invoiceTemplateId });
      if (invoiceTemplate) {
        setInvoice?.(invoiceTemplate.invoice);
        invoiceContext.setInvoiceId?.(invoiceTemplateId);
      } else {
        navigateTo(
          _.includes(pathname, "/error") ? pathname : `${pathname}/error`
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceTemplateId]);

  return (
    <div>
      <InvoiceActions invoice={invoice} setInvoice={setInvoice} />

      <div className="py-3">
        <Outlet />
      </div>
    </div>
  );
};
export default InvoiceBodySection;
