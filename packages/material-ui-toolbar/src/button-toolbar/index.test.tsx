import React from "react";
import {render, cleanup} from "@testing-library/react";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";

import {ButtonToolbar} from "./";

afterEach(cleanup);

describe("<ButtonToolbar />", () => {
  it("renders component", () => {
    const {asFragment} = render(
      <MuiThemeProvider theme={createMuiTheme()}>
        <ButtonToolbar />
      </MuiThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
