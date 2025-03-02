import { Text } from "@react-pdf/renderer";
import { PropsWithChildren } from "react";
import compose from "./composeStyle";

interface CustomTextProps {
  className?: string;
  pdfMode?: boolean;
}

const CustomText = ({
  children,
  className,
  pdfMode,
}: PropsWithChildren<CustomTextProps>) => {
  const classeText = "span " + (className ?? "");
  if (pdfMode) {
    return <Text style={compose(classeText)}>{children}</Text>;
  }

  return <span className={classeText}>{children}</span>;
};

export default CustomText;
