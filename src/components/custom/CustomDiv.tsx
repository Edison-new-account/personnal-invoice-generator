import { CSSProperties, PropsWithChildren } from "react";
import compose from "./composeStyle";
import { View } from "@react-pdf/renderer";

interface CustomDivProps {
  className?: string;
  style?: CSSProperties;
  pdfMode?: boolean;
}

const CustomDiv = ({
  children,
  className,
  pdfMode,
  style,
}: PropsWithChildren<CustomDivProps>) => {
  const classeDiv = "view " + (className ?? "");

  if (pdfMode) {
    return <View style={compose(classeDiv)}>{children}</View>;
  }

  return (
    <div className={classeDiv} style={style}>
      {children}
    </div>
  );
};

export default CustomDiv;
