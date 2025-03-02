import { Page } from "@react-pdf/renderer";
import { FC, PropsWithChildren } from "react";
import compose from "./composeStyle";

interface CustomPageProps {
  pdfMode?: boolean;
  className?: string;
}

const CustomPage: FC<PropsWithChildren<CustomPageProps>> = ({
  children,
  pdfMode,
  className,
}) => {
  const classePage = "page " + (className ?? "");
  if (pdfMode) {
    return (
      <Page size={"A4"} style={compose(classePage)}>
        {children}
      </Page>
    );
  }

  return <div className={classePage}>{children}</div>;
};

export default CustomPage;
