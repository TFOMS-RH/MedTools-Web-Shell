import { TextField } from "@mui/material";
import { medViewDefaultInputSx } from "../../../../sxConfigs/medViewDefaultInputSx";

interface MedViewDefaultInputProps {
  label: string;
  placeholder: string;
  fullWidth?: boolean;
  size?: "small" | "medium";
  variant?: "outlined" | "standard";
  handleInputChange: (value: string) => void;
  value: string;
}

export const MedViewDefaultInput = ({
  label,
  placeholder,
  fullWidth = true,
  size = "small",
  variant = "outlined",
  handleInputChange,
  value,
}: MedViewDefaultInputProps) => {
  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      placeholder={placeholder}
      size={size}
      variant={variant}
      slotProps={{
        inputLabel: {
          shrink: true,
        },
      }}
      sx={medViewDefaultInputSx}
      onChange={(event) => handleInputChange(event.target.value)}
      value={value}
    />
  );
};
