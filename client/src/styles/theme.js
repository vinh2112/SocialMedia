const globalTheme = {
  switchWidth: "40px",
  switchHeight: "20px",
  switchPadding: "3px",
  colorContrastLow: "#d3d3d4",
  colorWhite: "#FFF",
  switchColorPrimary: "#fe3456",
  switchAnimationDuration: "0.2s",
  gradient:
    "linear-gradient(122deg, rgba(128,74,216,1) 0%, rgba(98,75,217,1) 100%)",
  colorGray: "#4e4e4e",
};

export const lightTheme = {
  primary: "#fefefe",
  secondary: "#fafafc",
  contrastColor: "#eaeaea",
  hoverColor: "#dfdfdf",
  textColor: "#333",
  subTextColor: "#999",
  borderColor: "#ddd",
  toastColor: "#fff",
  ...globalTheme,
};

export const darkTheme = {
  primary: "#2d2d30",
  secondary: "#1e1e1e",
  contrastColor: "#444444",
  hoverColor: "#505050",
  textColor: "#fff",
  subTextColor: "#666",
  borderColor: "#444",
  toastColor: "#181818",
  ...globalTheme,
};
