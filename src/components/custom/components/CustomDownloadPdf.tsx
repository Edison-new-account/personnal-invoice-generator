import React, { JSXElementConstructor, useState } from "react";
import CustomButtonAction from "./CustomButtonAction";
import { Document, DocumentProps, Page, pdf, Text } from "@react-pdf/renderer";

interface CustomDownloadPdfProps {
  title: string;
  fileName: string;
  Icon: React.ReactNode;
  tooltip?: string;
  document: React.ReactElement<
    DocumentProps,
    string | JSXElementConstructor<any>
  >;
}

const FallbackDocument = () => (
  <Document>
    <Page size="A4" style={{ padding: 30 }}>
      <Text>
        Document par défaut - Le document demandé n'a pas pu être généré.
      </Text>
    </Page>
  </Document>
);

const CustomDownloadPdf = ({
  document: pdfDoc,
  Icon,
  tooltip,
  title,
  fileName,
}: CustomDownloadPdfProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Vérifier si le document est valide
  const isValidDocument = pdfDoc && React.isValidElement(pdfDoc);
  const handleDownload = async () => {
    try {
      setIsLoading(true);
      setHasError(false);

      // Utiliser le document fourni ou le document de secours
      const docToRender = isValidDocument ? pdfDoc : <FallbackDocument />;

      // Utilisation de la méthode pdf() pour générer le blob
      const blob = await pdf(docToRender).toBlob();

      // Création de l'URL à partir du blob
      const url = URL.createObjectURL(blob);

      // Création d'un lien de téléchargement temporaire
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;

      // Ajout du lien au document, clic, puis suppression
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Libération de l'URL
      URL.revokeObjectURL(url);

      setIsLoading(false);
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      setHasError(true);
      setIsLoading(false);
      alert(
        "Une erreur est survenue lors de la génération du PDF. Veuillez réessayer."
      );
    }
  };

  return (
    <CustomButtonAction
      Icon={Icon}
      title={isLoading ? "Chargement..." : title}
      tooltip={hasError ? "Erreur lors de la génération. Réessayez." : tooltip}
      onClick={handleDownload}
    />
  );
};

export default CustomDownloadPdf;
