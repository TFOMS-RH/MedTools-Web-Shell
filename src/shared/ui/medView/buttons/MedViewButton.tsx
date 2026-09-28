import { Button } from "@mui/material";

interface MedViewButtonProps {
  text: string;
  variant: "text" | "contained" | "outlined";
  onClick: () => void;
}

export const MedViewButton = ({
  text,
  variant,
  onClick,
}: MedViewButtonProps) => {
  return (
    <Button variant={variant} onClick={onClick}>
      {text}
    </Button>
  );
};
