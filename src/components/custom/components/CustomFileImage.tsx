import { Image } from "@react-pdf/renderer";
import { useRef, useState } from "react";
import compose from "../composeStyle";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import _ from "lodash";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import ClickAwayListener from "react-click-away-listener";

interface CustomFileImageProps {
  className?: string;
  value?: string;
  onChange?: (name: string, value: string) => void;
  onChangeWidth?: (name: string, value: number) => void;
  pdfMode?: boolean;
  name: string;
  width?: number;
  placeholder?: string;
  readonly?: boolean;
}

const MARKS = {
  100: "100px",
  150: "150px",
  200: "200px",
  250: "250px",
};

const CustomFileImage = ({
  className,
  pdfMode,
  value,
  onChange,
  onChangeWidth,
  name,
  width,
  placeholder,
  readonly,
}: CustomFileImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const widthWrapperRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const imageClassname = "image " + (className ?? "");

  if (!value && pdfMode) {
    return <></>;
  }

  if (pdfMode) {
    return (
      <Image
        style={{ ...compose(imageClassname), maxWidth: width ?? 100 }}
        src={value}
      />
    );
  }

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    if (typeof onChange === "function") {
      onChange(name, "");
    }
  };

  const handleResize = () => {
    setIsEditing(!isEditing);
  };

  const handleChangeWidth = (value: number | number[]) => {
    if (typeof onChangeWidth === "function") {
      onChangeWidth(name, _.isArray(value) ? (value[0] as number) : value);
    }
  };

  const handleChange = () => {
    if (fileInputRef?.current?.files) {
      const files = fileInputRef.current.files;

      if (files.length > 0 && typeof onChange === "function") {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
          if (typeof reader.result === "string") {
            onChange(name, reader.result);
          }
        });

        reader.readAsDataURL(files[0]);
      }
    }
  };

  return (
    <div className={`${imageClassname} ${value ? "mb-5" : ""}`}>
      {!value && (
        <button onClick={handleUpload} type="button" className="image__upload">
          {placeholder ?? "Upload Image"}
        </button>
      )}

      {value && (
        <>
          {/* Display logo */}
          <img
            src={value}
            className="image__img"
            alt={placeholder ?? "Uploaded"}
            style={{ maxWidth: width || 100 }}
          />

          {/* Change logo */}
          <button
            type="button"
            className="image__change"
            onClick={handleUpload}
          >
            Change logo
          </button>

          {/* Remove logo */}
          <CancelPresentationIcon
            className="image__remove"
            onClick={handleRemoveImage}
            style={{
              width: "15px",
              height: "15px",
            }}
          />

          {/* Resize logo */}
          <AspectRatioIcon
            className="image__edit"
            onClick={handleResize}
            style={{
              width: "15px",
              height: "15px",
            }}
          />

          {/* Resize logo slider*/}
          {isEditing && !readonly && (
            <ClickAwayListener
              onClickAway={() => {
                if (isEditing) {
                  setIsEditing(false);
                }
              }}
            >
              <div ref={widthWrapperRef} className="image__width-wrapper">
                <Slider
                  min={100}
                  max={250}
                  marks={MARKS}
                  included={false}
                  step={1}
                  onChange={handleChangeWidth}
                  defaultValue={width || 100}
                />
              </div>
            </ClickAwayListener>
          )}
        </>
      )}

      <input
        ref={fileInputRef}
        tabIndex={-1}
        type="file"
        accept="image/*"
        className="image__file"
        onChange={handleChange}
        readOnly={readonly}
      />
    </div>
  );
};

export default CustomFileImage;
