import MenuItem from "@mui/material/MenuItem";
import { Box, FormControl, InputLabel, Select } from "@mui/material";
import { medViewSelectInputSx } from "../../../../sxConfigs/medViewSelectInput";

type Option<T extends string> = {
  label: string;
  value: T;
};

type MedViewSelectInputProps<T extends string> = {
  options: Option<T | "">[];
  label: string;
  value: string;
  onChange: (value: T) => void;
};

export function MedViewSelectInput<T extends string>({
  options,
  label,
  value,
  onChange,
}: MedViewSelectInputProps<T>) {
  return (
    <Box>
      <FormControl size="small" fullWidth sx={medViewSelectInputSx}>
        <InputLabel
          shrink
          sx={{
            fontFamily: "var(--inter)",
          }}
        >
          {label}
        </InputLabel>
        <Select
          displayEmpty
          renderValue={(selected) => {
            if (!selected) {
              return <span style={{ color: "var(--gray-500)" }}>Мужской</span>;
            }

            return options.find((x) => x.value === selected)?.label;
          }}
          notched
          value={value}
          onChange={(event) => onChange(event.target.value as T)}
          label={label}
        >
          {options.length > 0 ? (
            options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>Данных не найдено</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
}
