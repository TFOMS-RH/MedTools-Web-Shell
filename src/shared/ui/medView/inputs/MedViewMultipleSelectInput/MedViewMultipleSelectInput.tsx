import MenuItem from "@mui/material/MenuItem";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { medViewSelectInputSx } from "../../../../sxConfigs/medViewSelectInput";

interface Option {
  label: string;
  value: string;
}

interface MedViewMultipleSelectInputProps {
  options: Option[];
  label: string;
  values: string[];
  multiple?: boolean;
  onChange: (value: string[]) => void;
}

export const MedViewMultipleSelectInput = ({
  options,
  label,
  values,
  onChange,
}: MedViewMultipleSelectInputProps) => {
  const handleChange = (event: SelectChangeEvent<typeof values>) => {
    const {
      target: { value },
    } = event;

    onChange(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Box>
      <FormControl size="small" fullWidth sx={medViewSelectInputSx}>
        <InputLabel
          sx={{
            fontFamily: "var(--inter)",
          }}
        >
          {label}
        </InputLabel>
        <Select
          multiple
          value={values}
          onChange={handleChange}
          label={label}
          MenuProps={{
            slotProps: {
              paper: {
                style: {
                  maxHeight: 500,
                  width: 250,
                },
              },
            },
          }}
        >
          {options.length > 0 ? (
            options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>Нет доступных опций</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
};
