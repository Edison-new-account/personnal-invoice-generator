import { Text } from "@react-pdf/renderer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import compose from "../composeStyle";

interface CustomCalendarProps {
  className?: string;
  pdfMode?: boolean;
  placeholder?: string;
  onChange?: (name: string, date: Date | null | [Date, Date]) => void;
  value?: string;
  selectedDate?: Date;
  name: string;
  format?: string;
  readonly?: boolean;
}
const CustomCalendar = ({
  className,
  pdfMode,
  placeholder,
  onChange,
  value,
  selectedDate,
  name,
  format = "MMM dd, yyyy",
  readonly,
}: CustomCalendarProps) => {
  const classeSpan = "span " + (className ?? "");
  const classeInput = "input " + (className ?? "");

  if (pdfMode) {
    return <Text style={compose(classeSpan)}>{value}</Text>;
  }

  const handleChange = (date: Date | [Date, Date] | null) => {
    if (onChange) {
      onChange(name, date);
    }
  };

  return (
    <DatePicker
      className={classeInput}
      selected={selectedDate}
      placeholderText={placeholder}
      onChange={handleChange}
      dateFormat={format}
      readOnly={readonly}
    />
  );
};

export default CustomCalendar;
