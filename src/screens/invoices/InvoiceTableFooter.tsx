import CustomInput from "@/components/custom/components/CustomInput";
import CustomDiv from "@/components/custom/CustomDiv";
import CustomText from "@/components/custom/CustomText";
import { GenericObject, InputType } from "@/lib/global";
import { Invoice } from "@/lib/models";
import _ from "lodash";

import { useEffect, useState } from "react";

interface InvoiceTableFooterProps {
  invoice: Invoice;
  pdfMode?: boolean;
  readonly?: boolean;
  onChange?: (name: string, value: GenericObject) => void;
  onAdd?: () => void;
}
const InvoiceTableFooter = ({
  invoice,
  pdfMode,
  readonly,
  onChange,
  onAdd,
}: InvoiceTableFooterProps) => {
  const [invoiceLabel, setInvoiceLabel] = useState<Invoice["label"]>(
    invoice.label
  );

  const [invoiceBody, setInvoiceBody] = useState<Invoice["body"]>(invoice.body);

  useEffect(() => {
    setInvoiceBody(invoice.body);
    setInvoiceLabel(invoice.label);
  }, [invoice]);

  const onChangeLabel = (name: string, value: string | number) => {
    const newInvoiceLabel = { ...invoiceLabel, [name]: value };
    setInvoiceLabel(newInvoiceLabel);
    onChange?.("label", newInvoiceLabel);
  };

  const onChangeBody = (name: string, value: string | number) => {
    const newInvoiceBody = { ...invoiceBody, [name]: value };
    setInvoiceBody(newInvoiceBody);
    onChange?.("body", newInvoiceBody);
  };

  const computeTotal = () => {
    const subTotal = invoice.body.items.reduce(
      (acc, item) => acc + (item.quantity ?? 0) * (item.price ?? 0),
      0
    );
    return subTotal;
  };
  const computeSubTax = () => {
    return ((invoiceBody.sub_tax ?? 0) / 100) * computeTotal();
  };

  return (
    <CustomDiv className="flex justify-end mt-10" pdfMode={pdfMode}>
      {/* Add item button */}
      <CustomDiv className="w-50 mt-10" pdfMode={pdfMode}>
        {!pdfMode && !readonly && (
          <button className="link" onClick={onAdd}>
            <span className="icon icon-add bg-green mr-10"></span>
            Add Line Item
          </button>
        )}
      </CustomDiv>

      {/* Sous total, tax, total */}
      <CustomDiv className="w-50 mt-20" pdfMode={pdfMode}>
        {/* Sous total */}
        <CustomDiv className="flex p-5" pdfMode={pdfMode}>
          <CustomDiv className="w-50 p-5" pdfMode={pdfMode}>
            <CustomInput
              className="bold"
              value={invoiceLabel.sub_total}
              onChange={onChangeLabel}
              pdfMode={pdfMode}
              name="sub_total"
              readonly={readonly}
            />
          </CustomDiv>
          <CustomDiv className="grow p-5" pdfMode={pdfMode}>
            <CustomText className="dark right" pdfMode={pdfMode}>
              {computeTotal()}
            </CustomText>
          </CustomDiv>
        </CustomDiv>

        {/* Tax */}
        <CustomDiv className="flex items-center" pdfMode={pdfMode}>
          <CustomDiv className="flex p-5" pdfMode={pdfMode}>
            <CustomDiv className="w-60 p-5" pdfMode={pdfMode}>
              <CustomInput
                className="bold"
                value={invoiceLabel.sub_tax}
                onChange={onChangeLabel}
                pdfMode={pdfMode}
                name="sub_tax"
                readonly={readonly}
              />
            </CustomDiv>
            <CustomDiv className="w-20 p-5" pdfMode={pdfMode}>
              <CustomInput
                className="dark right"
                value={invoiceBody.sub_tax}
                onChange={onChangeBody}
                pdfMode={pdfMode}
                name="sub_tax"
                type={InputType.NUMBER}
                readonly={readonly}
              />
            </CustomDiv>
          </CustomDiv>

          <CustomDiv className="grow p-5" pdfMode={pdfMode}>
            <CustomText className="dark right" pdfMode={pdfMode}>
              {computeSubTax().toFixed(0)}
            </CustomText>
          </CustomDiv>
        </CustomDiv>

        {/* Total */}
        <CustomDiv className="flex bg-gray p-5" pdfMode={pdfMode}>
          <CustomDiv className="w-50 p-5" pdfMode={pdfMode}>
            <CustomInput
              className="bold"
              value={_.toUpper(invoiceLabel.total)}
              onChange={onChangeLabel}
              pdfMode={pdfMode}
              name="total"
              readonly={readonly}
            />
          </CustomDiv>
          <CustomDiv className="w-50 p-5" pdfMode={pdfMode}>
            <CustomText className="dark right bold" pdfMode={pdfMode}>
              {computeTotal() + computeSubTax()}
            </CustomText>
          </CustomDiv>
        </CustomDiv>
      </CustomDiv>
    </CustomDiv>
  );
};

export default InvoiceTableFooter;
