import CustomButtonAction from "@/components/custom/components/CustomButtonAction";
import CustomDiv from "@/components/custom/CustomDiv";
import { Invoice, TInvoice } from "@/lib/models";
import DownloadIcon from "@mui/icons-material/Download";
import DownloadingIcon from "@mui/icons-material/Downloading";
import UploadIcon from "@mui/icons-material/Upload";
import InvoiceDocument from "./InvoiceDocument";
import { useDebounce } from "@uidotdev/usehooks";
import FileSaver from "file-saver";
import _ from "lodash";
import CustomInputFileToActionButton from "@/components/custom/components/CustomInputFileToActionButton";
import CustomDownloadPdf from "@/components/custom/components/CustomDownloadPdf";

interface InvoiceActionsProps {
  invoice: Invoice;
  setInvoice?: (invoice: Invoice) => void;
}
const InvoiceActions = ({ invoice, setInvoice }: InvoiceActionsProps) => {
  const debounced = useDebounce(invoice, 500);
  const title = _.toLower(invoice.header.title ?? "invoice");

  function handleSaveTemplate() {
    const blob = new Blob([JSON.stringify(debounced)], {
      type: "text/plain;charset=utf-8",
    });
    FileSaver(blob, title + ".json");
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    file
      .text()
      .then((str: string) => {
        try {
          if (!(str.startsWith("{") && str.endsWith("}"))) {
            str = atob(str);
          }
          const d = JSON.parse(str);
          const dParsed = TInvoice.parse(d);
          console.info("parsed correctly");
          setInvoice?.(dParsed);
        } catch (e) {
          console.error(e);
          return;
        }
      })
      .catch((err) => console.error(err));
  }

  return (
    <CustomDiv className="justify-center bg-gray p-20 my-5 mx-3 gap-3 grid grid-cols-3 fixed top-0 left-0">
      <CustomDownloadPdf
        title={"Télécharger"}
        document={<InvoiceDocument pdfMode={true} invoice={debounced} />}
        Icon={<DownloadIcon />}
        fileName={`${title}.pdf`}
        tooltip="Télécharger un invoice en format PDF"
      />

      <CustomInputFileToActionButton
        Icon={<UploadIcon />}
        title="Charger"
        onChange={handleInput}
        tooltip="Charger un invoice"
      />

      <CustomButtonAction
        Icon={<DownloadingIcon />}
        title="Enregistrer"
        onClick={handleSaveTemplate}
        tooltip="Enregistrer un invoice en format JSON"
      />
    </CustomDiv>
  );
};

export default InvoiceActions;
