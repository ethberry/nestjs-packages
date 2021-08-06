import React from "react";
import { IntlProvider } from "react-intl";
import { render, cleanup } from "@testing-library/react";
import { MuiThemeProvider, createTheme } from "@material-ui/core";

import { DeleteDialog } from "./index";

afterEach(cleanup);

const i18n = {
  "dialogs.delete": "Delete `{title}`?",
  "dialogs.confirmation": "Please confirm",
  "form.buttons.cancel": "Cancel",
  "form.buttons.ok": "Ok",
};

describe("<DeleteDialog />", () => {
  it("renders open component", () => {
    const container = document.createElement("div");
    document.body.append(container);

    const props = {
      container,
      open: true,
      onConfirm: jest.fn(),
      onCancel: jest.fn(),
      children: "some text",
      initialValues: {
        id: 1,
        title: "Title",
      },
    };

    const { asFragment } = render(
      <MuiThemeProvider theme={createTheme()}>
        <IntlProvider locale="en" messages={i18n}>
          <DeleteDialog {...props} />
        </IntlProvider>
      </MuiThemeProvider>,
      { container },
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
