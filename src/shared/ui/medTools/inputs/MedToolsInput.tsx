import { TextField } from "@mui/material";
import { medToolsInputSx } from "../../../sxConfigs/medToolsInputSx";

interface MedToolsInputProps {
  label: string;
  placeholder: string;
  fullWidth?: boolean;
  size?: "small" | "medium";
  variant?: "outlined" | "standard";
  handleInputChange: (value: string) => void;
  value: string;
  isPassword?: boolean;
}

export const MedToolsInput = ({
  label,
  placeholder,
  fullWidth,
  size,
  variant,
  handleInputChange,
  value,
  isPassword = false,
}: MedToolsInputProps) => {
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
      sx={medToolsInputSx}
      onChange={(event) => handleInputChange(event.target.value)}
      value={value}
      type={isPassword ? "password" : "text"}
    />
  );
};
