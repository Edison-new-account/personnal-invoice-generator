import CustomInput from "@/components/custom/components/CustomInput";
import CustomDiv from "@/components/custom/CustomDiv";
import { Invoice } from "@/lib/models";
import { useEffect, useState } from "react";
import { format } from "date-fns/format";
import CustomSelect from "@/components/custom/components/CustomSelect";
import countryList from "@/lib/countryList";
import _ from "lodash";
import CustomCalendar from "@/components/custom/components/CustomCalendar";
import { GenericObject } from "@/lib/global";
import CustomFileImage from "@/components/custom/components/CustomFileImage";

interface InvoiceHeaderProps {
  invoice: Invoice;
  pdfMode?: boolean;
  onChange?: (name: string, value: GenericObject) => void;
}

const InvoiceHeader = ({ invoice, pdfMode, onChange }: InvoiceHeaderProps) => {
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

  const getDate = (date: Date) => {
    const dateFormat = "MMM dd, yyyy";
    return format(date, dateFormat);
  };

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
            width={header.author.logo_width}
          />
          <CustomInput
            className="fs-20 bold"
            placeholder="Your Company"
            value={header.company_name}
            onChange={(name, value) => handleChange(name, value)}
            pdfMode={pdfMode}
            name="company_name"
          />
          <CustomInput
            placeholder="Your Name"
            value={header.author.name}
            onChange={(name, value) => handleChange(name, value, "author")}
            pdfMode={pdfMode}
            name="name"
          />
          <CustomInput
            placeholder="Company's Address"
            value={header.company_address}
            onChange={(name, value) => handleChange(name, value)}
            pdfMode={pdfMode}
            name="company_address"
          />
          {/* <CustomInput
            placeholder="City, State Zip"
            value={getCityStateZip(
              header.author.city,
              header.author.state,
              header.author.zip
            )}
            //   onChange={(value) => handleChange("companyAddress2", value)}
            pdfMode={pdfMode}
            name="from.city_state_zip"
          /> */}
          <CustomSelect
            options={countryList}
            placeholder="Country"
            value={header.author.country}
            onChange={(name, value) => handleChange(name, value, "author")}
            pdfMode={pdfMode}
            name="country"
          />
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
          />
        </CustomDiv>
      </CustomDiv>

      <CustomDiv className="flex mt-11" pdfMode={pdfMode}>
        <CustomDiv className="w-55" pdfMode={pdfMode}>
          <CustomInput
            className="bold dark mb-5"
            placeholder="Bill To:"
            onChange={handleChangeLabel}
            value={label.bill_to}
            pdfMode={pdfMode}
            name="bill_to"
          />
          <CustomInput
            placeholder="You Client's Name"
            value={header.bill_to.name}
            onChange={(name, value) => handleChange(name, value, "bill_to")}
            pdfMode={pdfMode}
            name="name"
          />
          <CustomInput
            placeholder="Company's Address"
            value={header.bill_to.address}
            onChange={(name, value) => handleChange(name, value, "bill_to")}
            pdfMode={pdfMode}
            name="address"
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
          />
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
              />
            </CustomDiv>
            <CustomDiv className="w-60" pdfMode={pdfMode}>
              <CustomInput
                placeholder="INV-12"
                value={header.invoice.number}
                onChange={(name, value) => handleChange(name, value, "invoice")}
                pdfMode={pdfMode}
                name="number"
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
              />
            </CustomDiv>
            <CustomDiv className="w-60" pdfMode={pdfMode}>
              <CustomCalendar
                placeholder={getDate(new Date())}
                value={getDate(new Date(header.invoice.date))}
                selectedDate={new Date(header.invoice.date)}
                onChange={(name, value) => {
                  handleChange(name, value as Date, "invoice");
                }}
                pdfMode={pdfMode}
                name="date"
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
              />
            </CustomDiv>
            <CustomDiv className="w-60" pdfMode={pdfMode}>
              <CustomCalendar
                placeholder={getDate(new Date())}
                value={getDate(new Date(header.invoice.due_date))}
                selectedDate={new Date(header.invoice.due_date)}
                onChange={(name, value) => {
                  handleChange(name, value as Date, "invoice");
                }}
                pdfMode={pdfMode}
                name="due_date"
              />
            </CustomDiv>
          </CustomDiv>
        </CustomDiv>
      </CustomDiv>
    </CustomDiv>
  );
};

export default InvoiceHeader;
