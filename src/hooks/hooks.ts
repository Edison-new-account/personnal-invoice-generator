import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
} from "react-redux";
import { RootState, AppDispatch } from "../store";

export const useSelector = <TSelected>(
  selector: (state: RootState) => TSelected
) => useReduxSelector<RootState, TSelected>(selector);

export const useDispatch = () => useReduxDispatch<AppDispatch>();
