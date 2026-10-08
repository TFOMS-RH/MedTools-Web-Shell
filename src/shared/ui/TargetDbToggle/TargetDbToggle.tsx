import type React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { medToolsToggleSx } from "../../sxConfigs/medToolsToggleSx";

interface TargetDbToggleProps {
  value: string;
  onChange: (event: React.MouseEvent<HTMLElement>, newAligment: string) => void;
}

export const TargetDbToggle = ({ value, onChange }: TargetDbToggleProps) => {
  return (
    <ToggleButtonGroup
      size="small"
      value={value}
      exclusive
      onChange={onChange}
      aria-label="Database type"
      sx={medToolsToggleSx}
    >
      <ToggleButton value="SMODB18">СМО РХ</ToggleButton>
      <ToggleButton value="INOGOROD18">Иногород</ToggleButton>
    </ToggleButtonGroup>
  );
};
