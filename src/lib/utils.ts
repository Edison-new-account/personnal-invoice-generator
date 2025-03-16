import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  defaultInvoiceBody,
  defaultInvoiceFooter,
  defaultInvoiceHeader,
  defaultInvoiceLabel,
  Invoice,
} from "./models";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const defaultInvoice: Invoice = {
  label: defaultInvoiceLabel,
  header: defaultInvoiceHeader,
  body: defaultInvoiceBody,
  footer: defaultInvoiceFooter,
};
