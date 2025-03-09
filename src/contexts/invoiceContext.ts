import { createContext } from "react";

interface InvoiceContextProps {
  invoiceId?: string;
  setInvoiceId?: (id: string) => void;
}
export const InvoiceContext = createContext<InvoiceContextProps>({
  invoiceId: undefined,
  setInvoiceId: undefined,
});
