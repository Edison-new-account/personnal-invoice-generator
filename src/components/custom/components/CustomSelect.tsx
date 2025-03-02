import { Text } from "@react-pdf/renderer";
import compose from "../composeStyle";
import { ChangeEvent, useState } from "react";

interface CustomSelectProps {
  className?: string;
  pdfMode?: boolean;
  placeholder?: string;
  onChange?: (name: string, value: string) => void;
  value?: string;
  autoFocus?: boolean;
  readOnly?: boolean;
  name: string;
  options: { label: string; value: string }[];
}
const CustomSelect = ({
  className,
  pdfMode,
  placeholder,
  options,
  onChange,
  value,
  autoFocus = true,
  readOnly = true,
  name,
}: CustomSelectProps) => {
  const classeSelect = "select " + (className ?? "");
  const classeSpan = "span " + (className ?? "");
  const classeInput = "input " + (className ?? "");

  const [isEditing, setIsEditing] = useState(false);

  if (pdfMode) {
    return <Text style={compose(classeSpan)}>{value}</Text>;
  }

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(name, event.target.value);
    }
  };
  return (
    <>
      {isEditing ? (
        <select
          className={classeSelect}
          onChange={handleChange}
          onBlur={() => setIsEditing(false)}
          value={value}
          autoFocus={autoFocus}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          className={classeInput}
          value={value}
          readOnly={readOnly}
          type="text"
          placeholder={placeholder}
          onFocus={() => setIsEditing(true)}
        />
      )}
    </>
  );
};

export default CustomSelect;
