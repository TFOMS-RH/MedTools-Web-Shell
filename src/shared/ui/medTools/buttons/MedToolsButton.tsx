import { Button } from "@mui/material";
import { medToolsButtonSx } from "../../../sxConfigs/medToolsButtonSx";

interface MedToolsButtonProps {
  text: string;
  variant: "text" | "contained" | "outlined";
  onClick: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium" | "large";
}

export const MedToolsButton = ({
  text,
  variant,
  onClick,
  disabled,
  fullWidth = true,
  size = "large",
}: MedToolsButtonProps) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      sx={medToolsButtonSx}
      fullWidth={fullWidth}
      size={size}
    >
      {text}
    </Button>
  );
};
