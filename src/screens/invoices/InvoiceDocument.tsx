import CustomDocument from "@/components/custom/CustomDocument";
import CustomPage from "@/components/custom/CustomPage";
import { Invoice } from "@/lib/models";
import InvoiceHeader from "./InvoiceHeader";
import InvoiceFooter from "./InvoiceFooter";
import InvoiceTable from "./InvoiceTable";
import { Font } from "@react-pdf/renderer";

interface InvoiceDocumentProps {
  pdfMode?: boolean;
  readonly?: boolean;
  invoice: Invoice;
  setInvoice?: (invoice: Invoice) => void;
}

// Register the Nunito font for PDF mode
Font.register({
  family: "Nunito",
  fonts: [
    { src: "https://fonts.gstatic.com/s/nunito/v12/XRXV3I6Li01BKofINeaE.ttf" },
    {
      src: "https://fonts.gstatic.com/s/nunito/v12/XRXW3I6Li01BKofA6sKUYevN.ttf",
      fontWeight: 600,
    },
  ],
});

const InvoiceDocument = ({
  pdfMode,
  invoice,
  setInvoice,
  readonly,
}: InvoiceDocumentProps) => {
  const handleChange = (name: string, value: any) => {
    setInvoice?.({ ...invoice, [name]: value });
  };

  return (
    <CustomDocument pdfMode={pdfMode}>
      <CustomPage className="invoice-wrapper" pdfMode={pdfMode}>
        <InvoiceHeader
          invoice={invoice}
          pdfMode={pdfMode}
          readonly={readonly}
          onChange={handleChange}
        />

        <InvoiceTable
          invoice={invoice}
          pdfMode={pdfMode}
          readonly={readonly}
          onChange={handleChange}
        />

        <InvoiceFooter
          invoice={invoice}
          pdfMode={pdfMode}
          readonly={readonly}
          onChange={handleChange}
        />
      </CustomPage>
    </CustomDocument>
  );
};

export default InvoiceDocument;
