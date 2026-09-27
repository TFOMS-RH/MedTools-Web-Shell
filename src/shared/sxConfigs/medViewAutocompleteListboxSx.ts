export const medViewAutocompleteListboxSx = {
  "& .MuiAutocomplete-option": {
    "&.Mui-focused": {
      backgroundColor: "transparent",
    },

    "&:hover": {
      backgroundColor: "var(--list-background-hover)",
    },

    '&[aria-selected="true"]': {
      backgroundColor: "var(--gray-200)",
    },

    '&[aria-selected="true"].Mui-focused': {
      backgroundColor: "var(--gray-200)",
    },

    '&[aria-selected="true"]:hover': {
      backgroundColor: "var(--gray-300)",
    },
  },
};
