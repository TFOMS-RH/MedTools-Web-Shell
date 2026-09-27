import type { FilterOption } from "../../../../../modules/medView/widgets/model/types/FilterOptions";
import { Autocomplete, TextField } from "@mui/material";
import { medViewSelectInputSx } from "../../../../sxConfigs/medViewSelectInput";

interface MedViewAutocompleteInputProps {
  label: string;
  values: FilterOption[];
  options: FilterOption[];
  inputValue: string;

  onInputChange: (value: string) => void;
  onChange: (values: FilterOption[]) => void;

  loading?: boolean;
}

export const MedViewAutocompleteInput = ({
  label,
  values,
  options,
  inputValue,
  onInputChange,
  onChange,
  loading,
}: MedViewAutocompleteInputProps) => {
  return (
    <Autocomplete
      size="small"
      multiple
      options={options}
      value={values}
      inputValue={inputValue}
      onInputChange={(_, newValue) => onInputChange(newValue)}
      onChange={(_, newValues) => onChange(newValues)}
      getOptionLabel={(option) => option.label}
      filterOptions={(options) => options}
      loading={loading}
      loadingText="Подтягиваем данные ..."
      noOptionsText="Нет доступных опций"
      renderInput={(params) => <TextField {...params} label={label} />}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      sx={medViewSelectInputSx}
    />
  );
};
