import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CustomText from "../CustomText";
import { CSSProperties } from "react";

const CustomButtonAction = ({
  Icon,
  title,
  onClick,
  tooltip,
  style,
}: {
  Icon?: React.ReactNode;
  title: string;
  onClick?: () => void;
  tooltip?: string;
  style?: CSSProperties;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className="flex items-center justify-center bg-gray-500 text-white p-2 text-center cursor-pointer hover:bg-gray-600"
          title={title}
          onClick={onClick}
          style={style}
        >
          {Icon}
          <CustomText className="center">{title}</CustomText>
        </button>
      </TooltipTrigger>

      {tooltip && (
        <TooltipContent className="bg-gray-700 text-white m-2 p-2 rounded-md">
          <p>{tooltip}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default CustomButtonAction;
