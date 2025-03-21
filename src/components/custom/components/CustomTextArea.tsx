import { Text } from "@react-pdf/renderer";
import compose from "../composeStyle";
import TextareaAutosize from "react-textarea-autosize";
import { ChangeEvent } from "react";

interface CustomTextAreaProps {
  className?: string;
  pdfMode?: boolean;
  placeholder?: string;
  onChange?: (name: string, value: string) => void;
  value?: string;
  rows?: number;
  name: string;
  readOnly?: boolean;
  resizable?: boolean;
  style?: Record<string, string>;
}

const CustomTextArea = ({
  className,
  pdfMode,
  placeholder,
  onChange,
  value,
  rows,
  name,
  readOnly,
  resizable,
  style,
}: CustomTextAreaProps) => {
  const classeTextArea = "input " + (className ?? "");
  const classeSpan = "span " + (className ?? "");

  if (pdfMode) {
    return <Text style={compose(classeSpan)}>{value}</Text>;
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(name, event.target.value);
    }
  };

  return (
    <TextareaAutosize
      className={classeTextArea}
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
      rows={rows ?? 1}
      readOnly={readOnly}
      style={{ resize: resizable ? "none" : undefined, ...style }}
    />
  );
};

export default CustomTextArea;
