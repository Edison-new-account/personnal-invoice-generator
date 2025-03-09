import CustomButtonAction from "@/components/custom/components/CustomButtonAction";
import CustomDiv from "@/components/custom/CustomDiv";
import { Invoice, TInvoice } from "@/lib/models";
import DownloadIcon from "@mui/icons-material/Download";
import DownloadingIcon from "@mui/icons-material/Downloading";
import AddIcon from "@mui/icons-material/Add";
import UploadIcon from "@mui/icons-material/Upload";
import InvoiceDocument from "./InvoiceDocument";
import { useDebounce } from "@uidotdev/usehooks";
import FileSaver from "file-saver";
import _ from "lodash";
import CustomInputFileToActionButton from "@/components/custom/components/CustomInputFileToActionButton";
import CustomDownloadPdf from "@/components/custom/components/CustomDownloadPdf";
import { useLocation, useNavigate } from "react-router";
import { ROUTE_PATHS } from "@/routes/path";
import { useDispatch, useSelector } from "@/hooks/hooks";
import { addInvoice, updateInvoice } from "@/store/slices/invoiceSlice";
import { toast } from "sonner";
import { getAllInvoices } from "@/store/selectors/invoices";
import useInvoiceContext from "@/hooks/useInvoiceContext";

interface InvoiceActionsProps {
  invoice: Invoice;
  invoiceTemplateId?: string;
  setInvoice?: (invoice: Invoice) => void;
}
const InvoiceActions = ({ invoice, setInvoice }: InvoiceActionsProps) => {
  const invoices = useSelector(getAllInvoices);
  const pathname = useLocation().pathname;

  const { invoiceId: invoiceTemplateId } = useInvoiceContext();

  const dispatch = useDispatch();
  const debounced = useDebounce(invoice, 500);
  const title = _.toLower(invoice.header.title ?? "invoice");

  const navigateTo = useNavigate();

  const isEditableScreen = _.some(["/create", "/edit"], (path) =>
    pathname.includes(path)
  );

  function handleSaveTemplate() {
    const blob = new Blob([JSON.stringify(debounced)], {
      type: "text/plain;charset=utf-8",
    });
    FileSaver(blob, title + ".json");
  }

  const handleCreateInvoice = () => {
    if (_.isEmpty(debounced?.body.items)) {
      toast.error("New invoice Error", {
        description: "You can't save an empty invoice",
        duration: 2000,
      });
      return;
    }
    dispatch(
      addInvoice({
        invoice: debounced,
        id: _.uniqueId(),
        status: "draft",
        created_at: new Date(),
      })
    );

    toast.success("New invoice created", {
      description: "The new invoice has been created successfully",
      duration: 2000,
    });

    navigateTo(ROUTE_PATHS.INVOICE.ROOT);
  };

  const handleEditInvoice = () => {
    const invoiceTemplate = invoices.find((i) => i.id === invoiceTemplateId);

    if (!invoiceTemplate) {
      toast.error("Invoice error", {
        description: "Impossible to find the invoice",
        duration: 2000,
      });
      return;
    }

    dispatch(
      updateInvoice({
        invoice: debounced,
        id: invoiceTemplate.id,
        status: invoiceTemplate.status,
        created_at: invoiceTemplate.created_at,
      })
    );

    toast.success("Invoice updated", {
      description: "The invoice has been updated successfully",
      duration: 2000,
    });

    navigateTo(ROUTE_PATHS.INVOICE.ROOT);
  };

  function handleSave() {
    if (!invoiceTemplateId) handleCreateInvoice();
    else {
      handleEditInvoice();
    }
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
    <CustomDiv className="bg-gray flex p-2 gap-3 justify-between">
      <CustomDiv className="flex gap-3">
        {isEditableScreen && (
          <>
            <CustomDownloadPdf
              title={"Télécharger (PDF)"}
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
              title="Enregistrer (JSON)"
              onClick={handleSaveTemplate}
              tooltip="Enregistrer un invoice en format JSON"
            />

            <CustomButtonAction
              Icon={<DownloadingIcon />}
              title="Enregistrer en local"
              onClick={handleSave}
            />
          </>
        )}
      </CustomDiv>

      <CustomDiv className="flex gap-3">
        {!_.includes(pathname, "/create") && (
          <CustomButtonAction
            Icon={<AddIcon />}
            title="Créer"
            onClick={() =>
              navigateTo(ROUTE_PATHS.INVOICE.CREATE ?? "/invoice/create")
            }
          />
        )}
        {isEditableScreen && (
          <CustomButtonAction
            title="Liste des invoices"
            onClick={() => navigateTo(ROUTE_PATHS.INVOICE.ROOT)}
          />
        )}
      </CustomDiv>
    </CustomDiv>
  );
};

export default InvoiceActions;
