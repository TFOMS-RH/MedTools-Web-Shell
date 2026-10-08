import { Box, FormControl, InputLabel, Select } from "@mui/material";
import { medViewSelectInputSx } from "../../../sxConfigs/medViewSelectInput";
import { medToolsSelectMenuSx } from "../../../sxConfigs/medToolsSelectMenuSx";
import MenuItem from "@mui/material/MenuItem";

type Option<T extends string> = {
  label: string;
  value: T;
};

type MedViewSelectInputProps<T extends string> = {
  options: Option<T | "">[];
  label: string;
  value: string;
  onChange: (value: T) => void;
  isLoading: boolean;
};

export function MedToolsSelect<T extends string>({
  options,
  label,
  value,
  isLoading,
  onChange,
}: MedViewSelectInputProps<T>) {
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
          value={value}
          onChange={(event) => onChange(event.target.value as T)}
          label={label}
          MenuProps={{
            sx: medToolsSelectMenuSx,
          }}
        >
          {isLoading ? (
            <MenuItem disabled>Загружаем данные...</MenuItem>
          ) : options.length > 0 ? (
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
