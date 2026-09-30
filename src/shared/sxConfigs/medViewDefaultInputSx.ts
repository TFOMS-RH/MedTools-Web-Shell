export const medViewDefaultInputSx = {
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

  "& .MuiInputLabel-root.Mui-focused": {
    color: "var(--text-primary)",
  },

  "& .MuiOutlinedInput-input": {
    fontFamily: "var(--inter)",
    fontSize: "var(--fs-body)",
    fontWeight: "var(--fw-default)",
    color: "var(--text-primary)",

    "&::placeholder": {
      fontFamily: "var(--inter)",
      fontSize: "var(--fs-body)",
      fontWeight: "var(--fw-default)",
      color: "var(--text-secondary)",
      opacity: 1,
    },
  },
};
