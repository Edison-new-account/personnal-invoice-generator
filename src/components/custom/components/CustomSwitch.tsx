import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

interface SwitchProps {
  label?: string;
  name: string;
  onChange?: (name: string, value: boolean) => void;
  defaultValue?: boolean;
  style?: React.CSSProperties;
}
const CustomSwitch = ({
  label,
  name,
  onChange,
  defaultValue,
  style,
}: SwitchProps) => {
  const [checked, setChecked] = useState(defaultValue);

  useEffect(() => {
    setChecked(defaultValue);
  }, [defaultValue]);

  const handleChange = (checked: boolean) => {
    onChange?.(name, checked);
  };

  return (
    <div className="flex items-center space-x-2" style={style}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Switch id={name} checked={checked} onCheckedChange={handleChange} />
    </div>
  );
};

export default CustomSwitch;
