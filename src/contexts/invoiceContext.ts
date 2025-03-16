import { createContext } from "react";

interface InvoiceContextProps {
  invoiceId?: string;
  setInvoiceId?: (id?: string) => void;
  setReadOnly?: (readOnly: boolean) => void;
}
export const InvoiceContext = createContext<InvoiceContextProps>({
  invoiceId: undefined,
  setInvoiceId: undefined,
  setReadOnly: undefined,
});
