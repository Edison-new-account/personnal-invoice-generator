import {
  defaultInvoiceBody,
  defaultInvoiceFooter,
  defaultInvoiceHeader,
  defaultInvoiceLabel,
  Invoice,
} from "@/lib/models";
import { useState } from "react";

import InvoicePageRoutes from "@/routes/InvoicePageRoutes";
import { InvoiceContext } from "@/contexts/invoiceContext";

const defaultInvoice: Invoice = {
  label: defaultInvoiceLabel,
  header: defaultInvoiceHeader,
  body: defaultInvoiceBody,
  footer: defaultInvoiceFooter,
};

const InvoicesPage = () => {
  const [invoice, setInvoice] = useState<Invoice>(defaultInvoice);

  const [invoiceId, setInvoiceId] = useState<string | undefined>(undefined);

  return (
    <InvoiceContext.Provider
      value={{
        invoiceId,
        setInvoiceId,
      }}
    >
      <InvoicePageRoutes invoice={invoice} setInvoice={setInvoice} />
    </InvoiceContext.Provider>
  );
};

export default InvoicesPage;
