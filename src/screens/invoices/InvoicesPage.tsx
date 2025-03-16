import { Invoice } from "@/lib/models";
import { useState } from "react";

import InvoicePageRoutes from "@/routes/InvoicePageRoutes";
import { InvoiceContext } from "@/contexts/invoiceContext";
import { defaultInvoice } from "@/lib/utils";

const InvoicesPage = () => {
  const [invoice, setInvoice] = useState<Invoice>(defaultInvoice);
  const [readOnly, setReadOnly] = useState<boolean>(false);

  const [invoiceId, setInvoiceId] = useState<string | undefined>(undefined);

  return (
    <InvoiceContext.Provider
      value={{
        invoiceId,
        setInvoiceId,
        setReadOnly,
      }}
    >
      <InvoicePageRoutes
        invoice={invoice}
        setInvoice={setInvoice}
        readonly={readOnly}
      />
    </InvoiceContext.Provider>
  );
};

export default InvoicesPage;
