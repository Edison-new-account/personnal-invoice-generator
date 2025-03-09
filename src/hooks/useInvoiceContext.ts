import { InvoiceContext } from "@/contexts/invoiceContext";
import { useContext } from "react";

const useInvoiceContext = () => {
  const context = useContext(InvoiceContext);
  return context;
};

export default useInvoiceContext;
