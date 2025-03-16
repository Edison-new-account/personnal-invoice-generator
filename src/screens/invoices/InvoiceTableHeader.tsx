import CustomInput from "@/components/custom/components/CustomInput";
import CustomDiv from "@/components/custom/CustomDiv";
import { GenericObject } from "@/lib/global";
import { Invoice } from "@/lib/models";
import { useState } from "react";

interface InvoiceTableHeaderProps {
  invoice: Invoice;
  pdfMode?: boolean;
  readonly?: boolean;
  onChange?: (name: string, value: GenericObject) => void;
}

const InvoiceTableHeader = ({
  invoice,
  pdfMode,
  readonly,
  onChange,
}: InvoiceTableHeaderProps) => {
  const [invoiceLabel, setInvoiceLabel] = useState<Invoice["label"]>(
    invoice.label
  );

  const handleChangeLabel = (name: string, value: string | number) => {
    const newInvoiceLabel: Invoice["label"] = {
      ...invoiceLabel,
      [name]: value,
    };
    setInvoiceLabel(newInvoiceLabel);
    onChange?.("label", newInvoiceLabel);
  };

  return (
    <CustomDiv className="mt-30 bg-dark flex" pdfMode={pdfMode}>
      <CustomDiv className="w-48 p-4-8" pdfMode={pdfMode}>
        <CustomInput
          className="white bold"
          value={invoiceLabel.item_description}
          onChange={handleChangeLabel}
          pdfMode={pdfMode}
          name="item_description"
          readonly={readonly}
        />
      </CustomDiv>

      <CustomDiv className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
        <CustomInput
          className="white bold right"
          value={invoiceLabel.item_quantity}
          onChange={handleChangeLabel}
          pdfMode={pdfMode}
          name="item_quantity"
          readonly={readonly}
        />
      </CustomDiv>

      <CustomDiv className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
        <CustomInput
          className="white bold right"
          value={invoiceLabel.item_price}
          onChange={handleChangeLabel}
          pdfMode={pdfMode}
          name="item_price"
          readonly={readonly}
        />
      </CustomDiv>

      <CustomDiv className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
        <CustomInput
          className="white bold right"
          value={invoiceLabel.item_total}
          onChange={handleChangeLabel}
          pdfMode={pdfMode}
          name="item_total"
          readonly={readonly}
        />
      </CustomDiv>
    </CustomDiv>
  );
};

export default InvoiceTableHeader;
