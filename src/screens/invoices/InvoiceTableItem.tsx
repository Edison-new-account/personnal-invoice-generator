import CustomInput from "@/components/custom/components/CustomInput";
import CustomTextArea from "@/components/custom/components/CustomTextArea";
import CustomDiv from "@/components/custom/CustomDiv";
import CustomText from "@/components/custom/CustomText";
import { GenericType, InputType } from "@/lib/global";
import { InvoiceItem } from "@/lib/models";
import _ from "lodash";
import { useState } from "react";

interface InvoiceTableItemProps {
  item: InvoiceItem & { index: number };
  pdfMode?: boolean;
  readonly?: boolean;
  onChange?: (name: string, value: GenericType, index: number) => void;
  onRemove?: (index: number) => void;
}

const InvoiceTableItem = ({
  item,
  pdfMode,
  readonly,
  onChange,
  onRemove,
}: InvoiceTableItemProps) => {
  const [invoiceItem, setInvoiceItem] = useState<
    InvoiceItem & { index: number }
  >(item);

  const handleChange = (name: string, value: GenericType) => {
    setInvoiceItem({ ...invoiceItem, [name]: value });
    onChange?.(name, value, item.index);
  };

  const computeAmount = () => {
    return invoiceItem.quantity * invoiceItem.price;
  };

  if (pdfMode && _.isEmpty(item.description)) {
    return <CustomText pdfMode={pdfMode}></CustomText>;
  }
  return (
    <CustomDiv className="row flex" pdfMode={pdfMode}>
      <CustomDiv className="w-48 p-4-8" pdfMode={pdfMode}>
        <CustomTextArea
          className="dark"
          rows={2}
          placeholder="Enter item name/description"
          value={invoiceItem.description}
          pdfMode={pdfMode}
          name={`description`}
          onChange={handleChange}
          readOnly={readonly}
          resizable={readonly}
        />
      </CustomDiv>

      <CustomDiv className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
        <CustomInput
          className="dark right"
          placeholder="Item Quantity"
          value={invoiceItem.quantity}
          onChange={handleChange}
          pdfMode={pdfMode}
          name={`quantity`}
          type={InputType.NUMBER}
          readonly={readonly}
        />
      </CustomDiv>

      <CustomDiv className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
        <CustomInput
          className="dark right"
          placeholder="Item Price"
          value={invoiceItem.price}
          pdfMode={pdfMode}
          name={`price`}
          type={InputType.NUMBER}
          onChange={handleChange}
          readonly={readonly}
        />
      </CustomDiv>

      <CustomDiv className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
        <CustomText className="dark right" pdfMode={pdfMode}>
          {computeAmount()}
        </CustomText>
      </CustomDiv>

      {!pdfMode && !readonly && (
        <button
          className="link row__remove"
          aria-label="Remove Row"
          title="Remove Row"
          onClick={() => onRemove?.(invoiceItem.index)}
        >
          <span className="icon icon-remove bg-red"></span>
        </button>
      )}
    </CustomDiv>
  );
};

export default InvoiceTableItem;
