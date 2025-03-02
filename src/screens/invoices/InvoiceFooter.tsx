import CustomInput from "@/components/custom/components/CustomInput";
import CustomTextArea from "@/components/custom/components/CustomTextArea";
import CustomDiv from "@/components/custom/CustomDiv";
import { GenericObject } from "@/lib/global";
import { Invoice } from "@/lib/models";
import { useState } from "react";
interface InvoiceFooterProps {
  pdfMode?: boolean;
  invoice: Invoice;
  onChange?: (name: string, value: GenericObject) => void;
}
const InvoiceFooter = ({ pdfMode, invoice, onChange }: InvoiceFooterProps) => {
  const [label, setLabel] = useState<Invoice["label"]>(invoice.label);
  const [footer, setFooter] = useState<Invoice["footer"]>(invoice.footer);

  const handleChangeLabel = (name: string, value: string | number) => {
    const newLabel: Invoice["label"] = {
      ...label,
      [name]: value,
    };
    setLabel(newLabel);
    onChange?.("label", newLabel);
  };

  const handleChangeFooter = (name: string, value: string | number) => {
    const newFooter: Invoice["footer"] = {
      ...footer,
      [name]: value,
    };
    setFooter(newFooter);
    onChange?.("footer", newFooter);
  };
  return (
    <CustomDiv pdfMode={pdfMode}>
      {/* Notes */}
      <CustomDiv className="mt-20" pdfMode={pdfMode}>
        <CustomInput
          className="bold w-100"
          value={label.notes}
          onChange={handleChangeLabel}
          pdfMode={pdfMode}
          name="notes"
        />
        <CustomTextArea
          className="w-100"
          rows={2}
          placeholder="Enter notes"
          value={footer.notes}
          pdfMode={pdfMode}
          onChange={handleChangeFooter}
          name="notes"
        />
      </CustomDiv>

      {/* Terms */}
      <CustomDiv className="mt-20" pdfMode={pdfMode}>
        <CustomInput
          className="bold w-100"
          value={label.terms}
          onChange={handleChangeLabel}
          pdfMode={pdfMode}
          name="terms"
        />
        <CustomTextArea
          className="w-100"
          rows={2}
          placeholder="Enter terms"
          value={footer.terms}
          pdfMode={pdfMode}
          onChange={handleChangeFooter}
          name="terms"
        />
      </CustomDiv>
    </CustomDiv>
  );
};

export default InvoiceFooter;
