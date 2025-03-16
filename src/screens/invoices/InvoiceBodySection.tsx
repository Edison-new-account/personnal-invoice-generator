import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import InvoicePageHeader from "./InvoicePageHeader";
import { Invoice, INVOICE_STATUS } from "@/lib/models";
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
        setInvoice?.({
          ...invoiceTemplate.invoice,
          body: {
            ...invoiceTemplate.invoice.body,
            items: invoiceTemplate.invoice.body.items.map((item) => ({
              ...item,
            })),
          },
        });
        invoiceContext.setInvoiceId?.(invoiceTemplateId);

        if (
          _.includes(
            [INVOICE_STATUS.paid, INVOICE_STATUS.pending],
            invoiceTemplate.status
          )
        ) {
          invoiceContext.setReadOnly?.(true);
        }
      } else {
        invoiceContext.setReadOnly?.(false);
        navigateTo(
          _.includes(pathname, "/error") ? pathname : `${pathname}/error`
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceTemplateId]);

  return (
    <div>
      <InvoicePageHeader invoice={invoice} setInvoice={setInvoice} />

      <div className="p-7">
        <Outlet />
      </div>
    </div>
  );
};
export default InvoiceBodySection;
