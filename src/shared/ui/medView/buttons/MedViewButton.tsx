import { Button } from "@mui/material";
import { medToolsButtonSx } from "../../../sxConfigs/medToolsButtonSx";

interface MedViewButtonProps {
  text: string;
  variant: "text" | "contained" | "outlined";
  onClick: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium" | "large";
}

export const MedViewButton = ({
  text,
  variant,
  onClick,
  disabled,
  fullWidth = true,
  size = "large",
}: MedViewButtonProps) => {
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
