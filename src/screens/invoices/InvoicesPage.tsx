import InvoiceDocument from "./InvoiceDocument";
import InvoiceActions from "./InvoiceActions";
import {
  defaultInvoiceBody,
  defaultInvoiceFooter,
  defaultInvoiceHeader,
  defaultInvoiceLabel,
  Invoice,
} from "@/lib/models";
import { useState } from "react";

const InvoicesPage = () => {
  const [invoice, setInvoice] = useState<Invoice>({
    label: defaultInvoiceLabel,
    header: defaultInvoiceHeader,
    body: defaultInvoiceBody,
    footer: defaultInvoiceFooter,
  });
  return (
    <div className="flex gap-5">
      <div className="w-1/3">
        <InvoiceActions invoice={invoice} setInvoice={setInvoice} />
      </div>

      <div className="app">
        <div className="flex justify-center items-center">
          <img src="/logo.svg" alt="logo" className="w-30 mb-2" />
          <h1 className="center fs-30 my-4">Edison's Invoice Generator</h1>
        </div>

        <InvoiceDocument invoice={invoice} setInvoice={setInvoice} />
      </div>
    </div>
  );
};

export default InvoicesPage;
