import { useRef } from "react";
import CustomButtonAction from "./CustomButtonAction";

interface CustomInputFileToActionButtonProps {
  Icon: React.ReactNode;
  title: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tooltip?: string;
  readOnly?: boolean;
}
const CustomInputFileToActionButton = ({
  Icon,
  title,
  onChange,
  tooltip,
  readOnly,
}: CustomInputFileToActionButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <CustomButtonAction
        Icon={Icon}
        title={title}
        onClick={handleClick}
        tooltip={tooltip}
      />
      <input
        type="file"
        accept=".json,.template"
        ref={fileInputRef}
        onChange={onChange}
        className="hidden"
        readOnly={readOnly}
      />
    </>
  );
};

export default CustomInputFileToActionButton;
