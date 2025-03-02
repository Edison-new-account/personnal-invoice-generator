import { TypeOf, z } from "zod";

export const InvoiceItem = z.object({
  description: z.string(),
  quantity: z.number(),
  price: z.number(),
  amount: z.number(),
});
export type InvoiceItem = z.infer<typeof InvoiceItem>;

const InvoiceLabel = z.object({
  title: z.string(),
  invoice_number: z.string(),
  invoice_date: z.string(),
  due_date: z.string(),
  bill_to: z.string(),
  item_description: z.string(),
  item_quantity: z.string(),
  item_price: z.string(),
  item_total: z.string(),
  notes: z.string(),
  terms: z.string(),
  sub_total: z.string(),
  sub_tax: z.string(),
  total: z.string(),
});

export type InvoiceLabel = z.infer<typeof InvoiceLabel>;

const InvoiceHeader = z.object({
  title: z.string().optional(),
  company_name: z.string().optional(),
  company_address: z.string().optional(),

  author: z.object({
    name: z.string(),
    country: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    logo: z.string().optional(),
    logo_width: z.number().optional(),
  }),
  bill_to: z.object({
    name: z.string(),
    address: z.string().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
  }),

  invoice: z.object({
    number: z.string(),
    date: z.union([z.date(), z.string()]),
    due_date: z.union([z.date(), z.string()]),
  }),
});

export type InvoiceHeader = z.infer<typeof InvoiceHeader>;

export const InvoiceBody = z.object({
  items: z.array(InvoiceItem),
  sub_total: z.number().optional(),
  sub_tax: z.number().optional().default(0),
  total: z.number(),
});
export type InvoiceBody = z.infer<typeof InvoiceBody>;

const InvoiceFooter = z.object({
  notes: z.string().optional(),
  terms: z.string().optional(),
});
export type InvoiceFooter = z.infer<typeof InvoiceFooter>;

export const TInvoice = z.object({
  header: InvoiceHeader,
  body: InvoiceBody,
  footer: InvoiceFooter,
  label: InvoiceLabel,
});

export type Invoice = TypeOf<typeof TInvoice>; //z.infer<typeof Invoice>;

export const defaultInvoiceLabel: InvoiceLabel = {
  title: "Invoice",
  invoice_number: "Invoice#",
  invoice_date: "Invoice Date",
  due_date: "Due Date",
  bill_to: "Bill To:",
  item_description: "Item Description",
  item_quantity: "Quantity",
  item_price: "Price",
  item_total: "Total",
  notes: "Notes",
  terms: "Terms & Conditions",
  sub_total: "Sub Total",
  sub_tax: "Sale Tax (%)",
  total: "TOTAL",
};

export const defaultInvoiceHeader: InvoiceHeader = {
  author: {
    name: "",
  },
  bill_to: {
    name: "",
  },
  invoice: {
    number: "INV-001",
    date: new Date(),
    due_date: new Date(),
  },
};

export const defaultInvoiceBody: InvoiceBody = {
  items: [],
  sub_total: 0,
  sub_tax: 10,
  total: 0,
};

export const defaultInvoiceFooter: InvoiceFooter = {
  notes: "",
  terms: "",
};
