import React, {FC, useEffect, useState} from "react";
import * as mediaQuery from "css-mediaquery";

import {createMuiTheme, CssBaseline, MuiThemeProvider} from "@material-ui/core";
import {MuiMediaQueryList} from "@material-ui/core/useMediaQuery";
import {PaletteOptions} from "@material-ui/core/styles/createPalette";

import {ThemeContext, ThemeType} from "./context";
import {dark, light} from "./palette";

export interface IThemeProviderProps {
  type?: ThemeType;
  darkPalette?: PaletteOptions;
  lightPalette?: PaletteOptions;
}

export const ThemeProvider: FC<IThemeProviderProps> = props => {
  const {type: defaultType = ThemeType.light, darkPalette = dark, lightPalette = light, children} = props;

  const [type, setType] = useState<ThemeType>(defaultType);

  useEffect(() => {
    const jssStyles = document.getElementById("jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  const changeThemeType = (type: ThemeType): void => {
    setType(type);
  };

  const ssrMatchMedia = (query: string): MuiMediaQueryList => ({
    addListener: (): void => {},
    removeListener: (): void => {},
    matches: mediaQuery.match(query, {
      width: 800,
    }),
  });

  const theme = createMuiTheme({
    props: {
      MuiUseMediaQuery: {
        ssrMatchMedia,
      },
    },
    palette: {
      light: lightPalette,
      dark: darkPalette,
    }[type],
    overrides: {
      // @ts-ignore
      MUIRichTextEditor: {
        placeHolder: {
          position: "relative",
        },
      },
    },
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
