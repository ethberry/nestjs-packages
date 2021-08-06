import React, { FC, useState } from "react";

import { createTheme, CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";

import { ThemeContext, ThemeType } from "./context";
import { dark, light } from "./palette";

export interface IThemeProviderProps {
  type?: ThemeType;
  darkPalette?: PaletteOptions;
  lightPalette?: PaletteOptions;
}

export const ThemeProvider: FC<IThemeProviderProps> = props => {
  const { type: defaultType = ThemeType.light, darkPalette = dark, lightPalette = light, children } = props;

  const [type, setType] = useState<ThemeType>(defaultType);

  const changeThemeType = (type: ThemeType): void => {
    setType(type);
  };

  const theme = createTheme({
    palette: {
      light: lightPalette,
      dark: darkPalette,
    }[type],
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeContext.Provider
        value={{
          type,
          changeThemeType,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
};
