export const medViewDateInputSx = {
  "& .MuiInputLabel-root": {
    color: "var(--text-secondary)",
    fontSize: "var(--fs-body)",
    fontFamily: "var(--inter)",
    fontWeight: "var(--fw-default)",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "var(--text-primary)",
  },

  "& .MuiPickersInputBase-root": {
    fontSize: "var(--fs-body)",
    borderRadius: "var(--radius-l)",
  },

  "& .MuiPickersOutlinedInput-notchedOutline": {
    borderColor: "var(--border-default)",
  },

  "& .MuiPickersInputBase-root:hover .MuiPickersOutlinedInput-notchedOutline": {
    borderColor: "var(--border-hover)",
  },

  "& .MuiPickersInputBase-root.Mui-focused .MuiPickersOutlinedInput-notchedOutline":
    {
      borderColor: "var(--border-focus)",
      borderWidth: "1px",
    },
};
