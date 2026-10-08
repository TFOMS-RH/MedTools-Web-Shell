import { Button } from "@mui/material";
import { medToolsButtonSx } from "../../../sxConfigs/medToolsButtonSx";

interface MedToolsButtonProps {
  text: string;
  variant: "text" | "contained" | "outlined";
  isLoading?: boolean;
  fullWidth?: boolean;
  isSubmitButton?: boolean;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

export const MedToolsButton = ({
  text,
  variant,
  onClick,
  fullWidth = true,
  size = "large",
  isSubmitButton = false,
  isLoading = false,
}: MedToolsButtonProps) => {
  return (
    <Button
      type={isSubmitButton ? "submit" : "button"}
      loading={isLoading}
      variant={variant}
      onClick={onClick}
      disabled={isLoading}
      sx={medToolsButtonSx}
      fullWidth={fullWidth}
      size={size}
      loadingPosition="end"
    >
      {text}
    </Button>
  );
};
