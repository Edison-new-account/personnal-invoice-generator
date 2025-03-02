import { FC, PropsWithChildren } from "react";
import { Document } from "@react-pdf/renderer";

interface CustomDocumentProps {
  pdfMode?: boolean;
}

const CustomDocument: FC<PropsWithChildren<CustomDocumentProps>> = ({
  children,
  pdfMode,
}) => {
  if (pdfMode) {
    return <Document>{children}</Document>;
  }

  return <>{children}</>;
};

export default CustomDocument;
