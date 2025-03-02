import { PropsWithChildren } from "react";
import compose from "./composeStyle";
import { View } from "@react-pdf/renderer";

interface CustomDivProps {
  className?: string;
  pdfMode?: boolean;
}

const CustomDiv = ({
  children,
  className,
  pdfMode,
}: PropsWithChildren<CustomDivProps>) => {
  const classeDiv = "view " + (className ?? "");

  if (pdfMode) {
    return <View style={compose(classeDiv)}>{children}</View>;
  }

  return <div className={classeDiv}>{children}</div>;
};

export default CustomDiv;
