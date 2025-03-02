import { Invoice, InvoiceItem } from "@/lib/models";
import { GenericObject, GenericType } from "@/lib/global";
import InvoiceTableHeader from "./InvoiceTableHeader";
import InvoiceTableItem from "./InvoiceTableItem";
import { useEffect, useState } from "react";
import InvoiceTableFooter from "./InvoiceTableFooter";
import CustomDiv from "@/components/custom/CustomDiv";
interface InvoiceTableProps {
  invoice: Invoice;
  pdfMode?: boolean;
  onChange?: (name: string, value: GenericObject) => void;
}

const InvoiceTable = ({ invoice, pdfMode, onChange }: InvoiceTableProps) => {
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>(
    invoice.body.items
  );

  useEffect(() => {
    setInvoiceItems(invoice.body.items);
  }, [invoice.body.items]);

  const handleChange = (name: string, value: GenericType, index: number) => {
    const newInvoiceItems = [...invoiceItems];
    newInvoiceItems[index][name as keyof InvoiceItem] = value as never;
    setInvoiceItems(newInvoiceItems);

    const newInvoiceBody = { ...invoice.body, items: newInvoiceItems };
    onChange?.("body", newInvoiceBody);
  };

  const handleRemove = (index: number) => {
    const newInvoiceItems = [...invoiceItems];
    newInvoiceItems.splice(index, 1);
    setInvoiceItems(newInvoiceItems);

    const newInvoiceBody = { ...invoice.body, items: newInvoiceItems };
    onChange?.("body", newInvoiceBody);
  };

  const handleAdd = () => {
    const newInvoiceItems = [
      ...invoiceItems,
      {
        name: "",
        description: "",
        quantity: 0,
        price: 0,
        amount: 0,
      },
    ];
    setInvoiceItems(newInvoiceItems);

    const newInvoiceBody = { ...invoice.body, items: newInvoiceItems };
    onChange?.("body", newInvoiceBody);
  };

  return (
    <CustomDiv pdfMode={pdfMode}>
      <InvoiceTableHeader
        invoice={invoice}
        pdfMode={pdfMode}
        onChange={onChange}
      />

      {/* Items table body */}
      {invoiceItems.map((item, index) => {
        return (
          <InvoiceTableItem
            key={index}
            item={{ ...item, index }}
            pdfMode={pdfMode}
            onChange={handleChange}
            onRemove={handleRemove}
          />
        );
      })}

      <InvoiceTableFooter
        invoice={invoice}
        pdfMode={pdfMode}
        onChange={onChange}
        onAdd={handleAdd}
      />
    </CustomDiv>
  );
};

export default InvoiceTable;
