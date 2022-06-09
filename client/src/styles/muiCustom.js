export const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "700px",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

export const textButtonStyle = {
  textTransform: "capitalize",
  color: "var(--primary-color)",
  "&:hover": {
    background: "rgba(254, 52, 86, 0.04)",
  },

  "&.btn-default": {
    color: "#9e9e9e",
    "&:hover": {
      background: "#9e9e9e20",
    },
  },
};

export const containedButtonStyle = {
  textTransform: "capitalize",
  backgroundColor: "var(--primary-color)",
  color: "#fff",
  "&:hover": {
    backgroundColor: "var(--primary-color)",
  },
};

export const outlinedButtonStyle = {
  textTransform: "capitalize",

  color: "#999",
  borderColor: "#999",
  "&:hover": {
    borderColor: "#999",
    backgroundColor: "rgba(153,153,153,0.1)",
  },
};

export const textFieldStyle = {
  "& label.Mui-focused": {
    color: "var(--primary-color)",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "var(--primary-color)",
    },
  },
};

export const textFieldPinStyle = {
  width: "56px",
  textAlign: "center",
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "var(--primary-color)",
    },
  },
};

export const stepStyle = {
  "& .MuiStepLabel-iconContainer .Mui-active": {
    color: "var(--primary-color)",
  },
  "& .MuiStepLabel-iconContainer .Mui-completed": {
    color: "var(--primary-color)",
  },
};

export const pinCodeStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "8px",
};

export const checkBoxStyle = {
  "&.Mui-checked": {
    color: "var(--primary-color)",
  },
  "&:hover": {
    background: "rgba(254, 52, 86, 0.04)",
  },
};

export const autoCompleteStyle = {
  '& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected="true"]': {
    backgroundColor: "rgba(254, 52, 86, 0.1) !important",
  },
};
