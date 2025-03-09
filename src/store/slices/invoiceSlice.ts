import { InvoiceTemplate } from "@/lib/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InvoiceState {
  invoices: InvoiceTemplate[];
}

const initialState: InvoiceState = {
  invoices: [],
};

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    addInvoice: (state, action: PayloadAction<InvoiceTemplate>) => {
      state.invoices.push(action.payload);
    },

    updateInvoice: (state, action: PayloadAction<InvoiceTemplate>) => {
      const index = state.invoices.findIndex(
        (invoice) => invoice.id === action.payload.id
      );

      if (index !== -1) {
        state.invoices[index] = action.payload;
      }
    },

    deleteInvoice: (state, action: PayloadAction<string>) => {
      state.invoices = state.invoices.filter(
        (invoice) => invoice.id !== action.payload
      );
    },
  },
});

export const { addInvoice, updateInvoice, deleteInvoice } =
  invoiceSlice.actions;
export default invoiceSlice.reducer;
