import {PaletteOptions} from "@material-ui/core/styles/createPalette";

export const light: PaletteOptions = {
  type: "light",
  primary: {
    main: "#4CAF50",
    light: "#54d97f",
    dark: "#007625",
    contrastText: "#fff",
  },
  secondary: {
    main: "#3C75E6",
    light: "#608FEC",
    dark: "#0A45B9",
    contrastText: "#fff",
  },
  background: {
    default: "#ffffff",
  },
};

export const dark: PaletteOptions = {
  type: "dark",
  primary: {
    main: "#00a651",
    light: "#54d97f",
    dark: "#007625",
    contrastText: "#fff",
  },
  secondary: {
    main: "#3C75E6",
    light: "#608FEC",
    dark: "#0A45B9",
    contrastText: "#fff",
  },
};
