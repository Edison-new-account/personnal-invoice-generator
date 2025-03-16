import CustomInput from "@/components/custom/components/CustomInput";
import CustomDiv from "@/components/custom/CustomDiv";
import { Invoice } from "@/lib/models";
import { useEffect, useState } from "react";
import CustomSelect from "@/components/custom/components/CustomSelect";
import countryList from "@/lib/countryList";
import _ from "lodash";
import CustomCalendar from "@/components/custom/components/CustomCalendar";
import { GenericObject } from "@/lib/global";
import CustomFileImage from "@/components/custom/components/CustomFileImage";
import { formatDate } from "./utils";
import CustomTextArea from "@/components/custom/components/CustomTextArea";

interface InvoiceHeaderProps {
  invoice: Invoice;
  pdfMode?: boolean;
  readonly?: boolean;
  onChange?: (name: string, value: GenericObject) => void;
}

const InvoiceHeader = ({
  invoice,
  pdfMode,
  onChange,
  readonly,
}: InvoiceHeaderProps) => {
  const [header, setHeader] = useState<Invoice["header"]>(invoice.header);
  const [label, setLabel] = useState<Invoice["label"]>(invoice.label);

  useEffect(() => {
    setHeader(invoice.header);
    setLabel(invoice.label);
  }, [invoice]);

  const handleChange = (
    name: string,
    value: string | number | Date | boolean,
    parent?: string
  ) => {
    if (parent) {
      const newHeader: Invoice["header"] = {
        ...header,
        [parent]: { ...(header as any)[parent], [name]: value },
      };
      setHeader(newHeader);
      onChange?.("header", newHeader);
    } else {
      const newHeader: Invoice["header"] = {
        ...header,
        [name]: value,
      };
      setHeader(newHeader);
      onChange?.("header", newHeader);
    }
  };

  const handleChangeLabel = (name: string, value: string | number) => {
    const newLabel: Invoice["label"] = {
      ...label,
      [name]: value,
    };
    setLabel(newLabel);
    onChange?.("label", newLabel);
  };

  //   const getCityStateZip = (city?: string, state?: string, zip?: string) => {
  //     let cityStateZip = "";
  //     if (city) {
  //       cityStateZip += city;
  //     }
  //     if (state) {
  //       cityStateZip += ", " + state;
  //     }
  //     if (zip) {
  //       cityStateZip += " " + zip;
  //     }
  //     return cityStateZip;
  //   };

  return (
    <CustomDiv pdfMode={pdfMode}>
      <CustomDiv className="flex justify-between" pdfMode={pdfMode}>
        {/* FROM */}

        <CustomDiv className="w-50" pdfMode={pdfMode}>
          <CustomFileImage
            name="logo"
            value={header.author.logo}
            onChange={(name, value) => handleChange(name, value, "author")}
            onChangeWidth={(_name, value) =>
              handleChange("logo_width", value, "author")
            }
            pdfMode={pdfMode}
            className="logo mb-5"
            placeholder="Your Logo"
            width={header.author.logo_width ?? 100}
            readonly={readonly}
          />

          {!header.invoice.light_format ? (
            <>
              <CustomInput
                className="fs-20 bold"
                placeholder="Your Company"
                value={header.company_name}
                onChange={(name, value) => handleChange(name, value)}
                pdfMode={pdfMode}
                name="company_name"
                readonly={readonly}
              />
              <CustomInput
                placeholder="Your Name"
                value={header.author.name}
                onChange={(name, value) => handleChange(name, value, "author")}
                pdfMode={pdfMode}
                name="name"
                readonly={readonly}
              />
              <CustomInput
                placeholder="Company's Address"
                value={header.company_address}
                onChange={(name, value) => handleChange(name, value)}
                pdfMode={pdfMode}
                name="company_address"
                readonly={readonly}
              />

              <CustomSelect
                options={countryList}
                placeholder="Country"
                value={header.author.country}
                onChange={(name, value) => handleChange(name, value, "author")}
                pdfMode={pdfMode}
                name="country"
                readOnly={readonly}
              />
            </>
          ) : (
            <CustomDiv className=" p-3">
              <CustomTextArea
                className="w-50"
                rows={5}
                placeholder="From"
                value={header.lightFormat?.from}
                pdfMode={pdfMode}
                onChange={(name, value) =>
                  handleChange(name, value, "lightFormat")
                }
                name="from"
                readOnly={readonly}
                resizable={readonly}
                style={{
                  height: "100px",
                  width: "500px",
                  border: "1px solid gray",
                }}
              />
            </CustomDiv>
          )}
        </CustomDiv>

        {/* INVOICE TITLE */}
        <CustomDiv className="w-50" pdfMode={pdfMode}>
          <CustomInput
            className="fs-45 right bold"
            placeholder="INVOICE"
            value={_.toUpper(label.title)}
            onChange={handleChangeLabel}
            pdfMode={pdfMode}
            name="title"
            readonly={readonly}
          />
        </CustomDiv>
      </CustomDiv>

      <CustomDiv className="flex mt-11" pdfMode={pdfMode}>
        <CustomDiv className="w-55" pdfMode={pdfMode}>
          {!header.invoice.light_format ? (
            <>
              <CustomInput
                className="bold dark mb-5"
                placeholder="Bill To:"
                onChange={handleChangeLabel}
                value={label.bill_to}
                pdfMode={pdfMode}
                name="bill_to"
                readonly={readonly}
              />
              <CustomInput
                placeholder="You Client's Name"
                value={header.bill_to.name}
                onChange={(name, value) => handleChange(name, value, "bill_to")}
                pdfMode={pdfMode}
                name="name"
                readonly={readonly}
              />
              <CustomInput
                placeholder="Company's Address"
                value={header.bill_to.address}
                onChange={(name, value) => handleChange(name, value, "bill_to")}
                pdfMode={pdfMode}
                name="address"
                readonly={readonly}
              />
              {/* <CustomInput
            placeholder="City, State Zip"
            value={getCityStateZip(
              header.bill_to.city,
              header.bill_to.state,
              header.bill_to.zip
            )}
            //   onChange={(value) => handleChange("companyAddress2", value)}
            pdfMode={pdfMode}
            name="to.city_state_zip"
          /> */}
              <CustomSelect
                options={countryList}
                placeholder="Country"
                value={header.bill_to.country}
                onChange={(name, value) => handleChange(name, value, "bill_to")}
                pdfMode={pdfMode}
                name="country"
                readOnly={readonly}
              />
            </>
          ) : (
            <CustomDiv className="w-50 p-3">
              <CustomTextArea
                rows={5}
                placeholder="To"
                value={header.lightFormat?.to}
                pdfMode={pdfMode}
                onChange={(name, value) =>
                  handleChange(name, value, "lightFormat")
                }
                name="to"
                readOnly={readonly}
                resizable={readonly}
                style={{
                  height: "100px",
                  width: "500px",
                  border: "1px solid gray",
                }}
              />
            </CustomDiv>
          )}
        </CustomDiv>

        <CustomDiv className="w-45" pdfMode={pdfMode}>
          {/* INVOICE NUMBER */}
          <CustomDiv className="flex mb-5" pdfMode={pdfMode}>
            <CustomDiv className="w-40" pdfMode={pdfMode}>
              <CustomInput
                className="bold"
                value={label.invoice_number}
                onChange={handleChangeLabel}
                pdfMode={pdfMode}
                name="invoice_number"
                readonly={readonly}
              />
            </CustomDiv>
            <CustomDiv className="w-60" pdfMode={pdfMode}>
              <CustomInput
                placeholder="INV-12"
                value={header.invoice.number}
                onChange={(name, value) => handleChange(name, value, "invoice")}
                pdfMode={pdfMode}
                name="number"
                readonly={readonly}
              />
            </CustomDiv>
          </CustomDiv>

          {/* INVOICE DATE */}
          <CustomDiv className="flex mb-5" pdfMode={pdfMode}>
            <CustomDiv className="w-40" pdfMode={pdfMode}>
              <CustomInput
                className="bold"
                value={label.invoice_date}
                onChange={handleChangeLabel}
                pdfMode={pdfMode}
                name="invoice_date"
                readonly={readonly}
              />
            </CustomDiv>
            <CustomDiv className="w-60" pdfMode={pdfMode}>
              <CustomCalendar
                placeholder={formatDate(new Date())}
                value={formatDate(new Date(header.invoice.date))}
                selectedDate={new Date(header.invoice.date)}
                onChange={(name, value) => {
                  handleChange(name, value as Date, "invoice");
                }}
                pdfMode={pdfMode}
                name="date"
                readonly={readonly}
              />
            </CustomDiv>
          </CustomDiv>

          {/* INVOICE DUE DATE */}
          <CustomDiv className="flex mb-5" pdfMode={pdfMode}>
            <CustomDiv className="w-40" pdfMode={pdfMode}>
              <CustomInput
                className="bold"
                value={label.due_date}
                onChange={handleChangeLabel}
                pdfMode={pdfMode}
                name="due_date"
                readonly={readonly}
              />
            </CustomDiv>
            <CustomDiv className="w-60" pdfMode={pdfMode}>
              <CustomCalendar
                placeholder={formatDate(new Date())}
                value={formatDate(new Date(header.invoice.due_date))}
                selectedDate={new Date(header.invoice.due_date)}
                onChange={(name, value) => {
                  handleChange(name, value as Date, "invoice");
                }}
                pdfMode={pdfMode}
                name="due_date"
                readonly={readonly}
              />
            </CustomDiv>
          </CustomDiv>
        </CustomDiv>
      </CustomDiv>
    </CustomDiv>
  );
};

export default InvoiceHeader;
