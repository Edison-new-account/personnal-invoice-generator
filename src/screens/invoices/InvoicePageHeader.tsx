import CustomButtonAction from "@/components/custom/components/CustomButtonAction";
import CustomDiv from "@/components/custom/CustomDiv";
import { Invoice, INVOICE_STATUS, TInvoice } from "@/lib/models";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
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
import { defaultInvoice } from "@/lib/utils";
import { useState } from "react";
import CustomAlertDialog from "@/components/custom/components/CustomAlert";
import CustomSwitch from "@/components/custom/components/CustomSwitch";
import CustomSelect from "@/components/custom/components/CustomSelect";
import { currencies } from "@/lib/currency";

interface InvoiceActionsProps {
  invoice: Invoice;
  invoiceTemplateId?: string;
  setInvoice?: (invoice: Invoice) => void;
}
const InvoicePageHeader = ({ invoice, setInvoice }: InvoiceActionsProps) => {
  const invoices = useSelector(getAllInvoices);
  const pathname = useLocation().pathname;

  const {
    invoiceId: invoiceTemplateId,
    setInvoiceId,
    setReadOnly,
  } = useInvoiceContext();

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
        id: (invoices.length + 1).toString(),
        status: INVOICE_STATUS.draft,
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
        ...invoiceTemplate,
        invoice: { ...debounced },
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
    if (!e.target.files?.length) {
      toast.error("File error", {
        description: "No file selected",
        duration: 2000,
      });
      return;
    }

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
          toast.error("File error", {
            description: "Error parsing the file",
            duration: 2000,
          });
          return;
        }
      })
      .catch((err) => console.error(err));
  }

  const handleInvoiceHeader = (name: string, value: any) => {
    setInvoice?.({
      ...invoice,
      header: {
        ...invoice.header,
        invoice: {
          ...invoice.header.invoice,
          [name]: value,
        },
      },
    });
  };

  const [openCancellingModal, setOpenCancellingModal] = useState(false);
  const handleCancelling = () => {
    setInvoiceId?.(undefined);
    navigateTo(ROUTE_PATHS.INVOICE.ROOT);
  };

  return (
    <CustomDiv
      className="py-5 flex p-2 gap-3 justify-between"
      style={{
        backgroundColor: "#f9fafc",
      }}
    >
      <div className="grow p-3">
        {!isEditableScreen ? (
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl bold">Free Facture Template</h1>
            <h2 className="text-xl">
              Make simple and beautiful Factures with one click!
            </h2>
            <p>
              You can download your invoice as a PDF or save it as a JSON file.
              You can also load an invoice from a JSON file.
            </p>
          </div>
        ) : (
          <div>
            <div className="py-3 flex flex-col gap-3">
              <CustomSwitch
                label="Light form"
                name="light_format"
                defaultValue={invoice.header.invoice.light_format ?? false}
                onChange={handleInvoiceHeader}
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              />

              <CustomSelect
                name="currency"
                label="Currency"
                value={invoice.header.invoice.currency ?? "USD"}
                options={_.map(_.keys(currencies), (currency) => {
                  return { label: currency, value: currency };
                })}
                style={{ display: "flex", alignItems: "center", gap: "30px" }}
                onChange={handleInvoiceHeader}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <CustomDiv className="grid grid-cols-2 gap-3">
          {isEditableScreen && (
            <>
              <CustomDownloadPdf
                title={"Télécharger (PDF)"}
                document={
                  <InvoiceDocument pdfMode={true} invoice={debounced} />
                }
                Icon={<PictureAsPdfIcon />}
                fileName={`${title}.pdf`}
                // tooltip="Télécharger un invoice en format PDF"
              />

              <CustomInputFileToActionButton
                Icon={<UploadIcon />}
                title="Charger un JSON"
                onChange={handleInput}
                // tooltip="Charger un invoice"
              />

              <CustomButtonAction
                Icon={<SimCardDownloadIcon />}
                title="Télécharger un JSON"
                onClick={handleSaveTemplate}
                // tooltip="Enregistrer un invoice en format JSON"
              />

              <CustomButtonAction
                Icon={<DownloadingIcon />}
                title="Enregistrer"
                onClick={handleSave}
              />
            </>
          )}
        </CustomDiv>

        <CustomDiv className="grid grid-cols-2 gap-3">
          {!_.includes(pathname, "/create") ? (
            <CustomButtonAction
              Icon={<AddIcon />}
              title="Créer"
              onClick={() => {
                setInvoiceId?.(undefined);
                setInvoice?.(defaultInvoice);
                setReadOnly?.(false);
                navigateTo(ROUTE_PATHS.INVOICE.CREATE ?? "/invoice/create");
              }}
            />
          ) : (
            <div />
          )}
          {isEditableScreen && (
            <CustomButtonAction
              title="Annuler"
              style={{ backgroundColor: "#f44336" }}
              onClick={() => setOpenCancellingModal(true)}
            />
          )}
        </CustomDiv>

        {openCancellingModal && (
          <CustomAlertDialog
            title="Annuler"
            message="Voulez-vous vraiment annuler?"
            onConfirm={handleCancelling}
            onClose={() => setOpenCancellingModal(false)}
            open={openCancellingModal}
          />
        )}
      </div>
    </CustomDiv>
  );
};

export default InvoicePageHeader;
