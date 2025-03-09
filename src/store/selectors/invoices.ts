import { RootState } from "..";

export const getAllInvoices = (state: RootState) => state.invoices.invoices;
