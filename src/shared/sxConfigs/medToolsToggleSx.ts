export const medToolsToggleSx = {
  "& .MuiToggleButtonGroup-grouped": {
    textTransform: "none",
    fontSize: "var(--fs-body)",
    fontWeight: "var(--fw-semibold)",
    fontFamily: "var(--inter)",
    border: "1px solid var(--border-default)",
    margin: "0",
    padding: "var(--space-2) var(--space-10)",
  },

  "& .MuiToggleButtonGroup-firstButton": {
    borderTopLeftRadius: "var(--radius-l)",
    borderBottomLeftRadius: "var(--radius-l)",
  },

  "& .MuiToggleButtonGroup-lastButton": {
    borderTopRightRadius: "var(--radius-l)",
    borderBottomRightRadius: "var(--radius-l)",
    borderLeft: "none",
  },

  "& .Mui-selected": {
    color: "var(--black)",
    background: "var(--selected-background)",
  },

  "& .Mui-selected:hover": {
    background: "none",
  },
};
