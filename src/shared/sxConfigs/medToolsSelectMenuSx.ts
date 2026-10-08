export const medToolsSelectMenuSx = {
  maxHeight: 500,
  "& .MuiMenuItem-root": {
    "&.Mui-focused": {
      backgroundColor: "transparent",
    },

    "&:hover": {
      backgroundColor: "var(--list-background-hover)",
    },

    "&.Mui-selected": {
      backgroundColor: "var(--gray-200)",
    },

    "&.Mui-selected.Mui-focusVisible": {
      backgroundColor: "var(--gray-200)",
    },

    "&.Mui-selected:hover": {
      backgroundColor: "var(--gray-300)",
    },
  },
};
