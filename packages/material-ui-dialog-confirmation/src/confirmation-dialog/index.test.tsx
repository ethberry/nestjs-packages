import React from "react";
import {IntlProvider} from "react-intl";
import {render, cleanup} from "@testing-library/react";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";

import {ConfirmationDialog} from "./";

afterEach(cleanup);

const i18n = {
  "dialogs.confirmation": "Please confirm",
  "form.buttons.cancel": "Cancel",
  "form.buttons.ok": "Ok",
};

describe("<ConfirmationDialog />", () => {
  it("renders closed dialog", () => {
    const container = document.createElement("div");
    document.body.append(container);

    const props = {
      container,
      open: false,
      onConfirm: jest.fn(),
      onCancel: jest.fn(),
      children: "some text",
    };

    const {asFragment} = render(
      <MuiThemeProvider theme={createMuiTheme()}>
        <IntlProvider locale="en" messages={i18n}>
          <ConfirmationDialog {...props} />
        </IntlProvider>
      </MuiThemeProvider>,
      {container},
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders open component", () => {
    const container = document.createElement("div");
    document.body.append(container);

    const props = {
      container,
      open: true,
      onConfirm: jest.fn(),
      onCancel: jest.fn(),
      children: "some text",
    };

    const {asFragment} = render(
      <MuiThemeProvider theme={createMuiTheme()}>
        <IntlProvider locale="en" messages={i18n}>
          <ConfirmationDialog {...props} />
        </IntlProvider>
      </MuiThemeProvider>,
      {container},
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
