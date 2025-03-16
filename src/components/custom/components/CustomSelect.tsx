import { Text } from "@react-pdf/renderer";
import compose from "../composeStyle";
import { ChangeEvent, useState } from "react";
import { Label } from "@/components/ui/label";

interface CustomSelectProps {
  className?: string;
  pdfMode?: boolean;
  placeholder?: string;
  onChange?: (name: string, value: string) => void;
  value?: string;
  autoFocus?: boolean;
  readOnly?: boolean;
  label?: string;
  name: string;
  options: { label: string; value: string }[];
  style?: React.CSSProperties;
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
  label,
  style,
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
    <div style={style}>
      {label && <Label htmlFor={name}>{label}</Label>}
      {isEditing ? (
        <select
          className={classeSelect}
          onChange={handleChange}
          onBlur={() => setIsEditing(false)}
          value={value}
          autoFocus={autoFocus}
          onMouseLeave={() => setIsEditing(false)}
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
          onMouseEnter={() => setIsEditing(true)}
        />
      )}
    </div>
  );
};

export default CustomSelect;
