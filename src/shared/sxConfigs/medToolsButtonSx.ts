export const medToolsButtonSx = {
  borderRadius: "var(--radius-l)",
  fontSize: "var(--fs-body)",
  fontFamily: "var(--inter)",
  fontWeight: "var(--fw-default)",
  textTransform: "none",
  borderColor: "var(--border-default)",
  color: "var(--text-primary)",
  padding: "", 
  boxShadow: "none",

  "&:hover": {
    borderColor: "var(--border-hover)",
    backgroundColor: "transparent", 
    boxShadow: "none",
  },

  "&.Mui-focused": {
    borderColor: "var(--border-focus)",
    borderWidth: "1px",
  },

  "&.Mui-disabled": {
    borderColor: "var(--border-default)",
    color: "var(--text-secondary)",
  },
};
