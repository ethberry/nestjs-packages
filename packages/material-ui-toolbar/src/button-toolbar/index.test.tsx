import React from "react";
import {render, cleanup} from "@testing-library/react";
import {MuiThemeProvider, createTheme} from "@material-ui/core";

import {ButtonToolbar} from "./";

afterEach(cleanup);

describe("<ButtonToolbar />", () => {
  it("renders component", () => {
    const {asFragment} = render(
      <MuiThemeProvider theme={createTheme()}>
        <ButtonToolbar />
      </MuiThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
