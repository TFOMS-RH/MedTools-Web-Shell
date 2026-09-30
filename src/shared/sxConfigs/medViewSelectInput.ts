export const medViewSelectInputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "var(--radius-l)",
    fontSize: "var(--fs-body)",
    "& fieldset": {
      borderColor: "var(--border-default)",
    },

    "&:hover fieldset": {
      borderColor: "var(--border-hover)",
    },

    "&.Mui-focused fieldset": {
      borderColor: "var(--border-focus)",
      borderWidth: "1px",
    },
  },
  "& .MuiInputLabel-root": {
    color: "var(--text-secondary)",
    fontSize: "var(--fs-body)",
    fontFamily: "var(--inter)",
    fontWeight: "var(--fw-default)",
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "var(--text-primary)" },
};
