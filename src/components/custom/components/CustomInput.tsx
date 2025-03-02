import { Text } from "@react-pdf/renderer";
import compose from "../composeStyle";
import { ChangeEvent } from "react";
import { InputType } from "@/lib/global";
import _ from "lodash";

interface CustomInputProps {
  className?: string;
  pdfMode?: boolean;
  placeholder?: string;
  onChange?: (name: string, value: string | number) => void;
  value?: string | number;
  name: string;
  type?: InputType;
}

const CustomInput = ({
  className,
  pdfMode,
  placeholder,
  onChange,
  value,
  name,
  type = InputType.TEXT,
}: CustomInputProps) => {
  const classeSpan = "span " + (className ?? "");
  const classeInput = "input " + (className ?? "");

  if (pdfMode) {
    return <Text style={compose(classeSpan)}>{_.toString(value)}</Text>;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(
        name,
        type === InputType.NUMBER
          ? _.toNumber(event.target.value)
          : event.target.value
      );
    }
  };

  return (
    <input
      className={classeInput}
      placeholder={placeholder}
      onChange={handleChange}
      value={value as string | number}
      type={type}
    />
  );
};

export default CustomInput;
