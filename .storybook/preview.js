import React from "react";

import {createTheme, CssBaseline, ThemeProvider} from "@material-ui/core";

export const decorators = [
  Story => (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
