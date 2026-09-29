import { Autocomplete, TextField } from "@mui/material";
import { medViewSelectInputSx } from "../../../../sxConfigs/medViewSelectInput";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { medViewAutocompleteListboxSx } from "../../../../sxConfigs/medViewAutocompleteListboxSx";
import type { FilterOption } from "../../../../../modules/medView/widgets/workspace/model/types/FilterOptions";

interface MedViewAutocompleteInputProps {
  label: string;
  values: FilterOption[];
  options: FilterOption[];
  inputValue: string;

  onInputChange: (value: string) => void;
  onChange: (values: FilterOption[]) => void;

  loading?: boolean;
  limitTags?: number;
}

export const MedViewAutocompleteInput = ({
  label,
  values,
  options,
  inputValue,
  onInputChange,
  onChange,
  loading,
  limitTags = 3,
}: MedViewAutocompleteInputProps) => {
  return (
    <Autocomplete
      size="small"
      multiple
      limitTags={limitTags}
      options={options}
      value={values}
      inputValue={inputValue}
      disableCloseOnSelect
      onInputChange={(_, newValue) => onInputChange(newValue)}
      onChange={(_, newValues) => onChange(newValues)}
      getOptionLabel={(option) => option.label}
      filterOptions={(options) => options}
      loading={loading}
      loadingText="Подтягиваем данные ..."
      noOptionsText="Нет доступных опций"
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderInput={(params) => <TextField {...params} label={label} />}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        const SelectedIcon = selected ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

        return (
          <li key={key} {...optionProps}>
            <SelectedIcon
              fontSize="small"
              style={{ boxSizing: "content-box", marginRight: 8 }}
            />
            {option.label}
          </li>
        );
      }}
      sx={medViewSelectInputSx}
      slotProps={{
        listbox: {
          sx: medViewAutocompleteListboxSx,
        },
      }}
    />
  );
};
