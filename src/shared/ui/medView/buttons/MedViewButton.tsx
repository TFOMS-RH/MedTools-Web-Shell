import { Button } from "@mui/material";
import { medViewButtonSx } from "../../../sxConfigs/medViewButtonSx";

interface MedViewButtonProps {
  text: string;
  variant: "text" | "contained" | "outlined";
  onClick: () => void;
  disabled?: boolean;
}

export const MedViewButton = ({
  text,
  variant,
  onClick,
  disabled,
}: MedViewButtonProps) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      sx={medViewButtonSx}
    >
      {text}
    </Button>
  );
};
