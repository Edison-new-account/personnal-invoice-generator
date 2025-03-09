import { combineReducers } from "@reduxjs/toolkit";
import invoiceReducer from "../slices/invoiceSlice";

const rootReducer = combineReducers({
  invoices: invoiceReducer,
});

export default rootReducer;
