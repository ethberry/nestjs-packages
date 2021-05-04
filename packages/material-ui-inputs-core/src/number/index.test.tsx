import React from "react";
import {IntlProvider} from "react-intl";
import {render, cleanup} from "@testing-library/react";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";
import {Formik} from "formik";

import {NumberInput} from "./";

afterEach(cleanup);

const i18n = {
  "form.labels.singleChoiceImageOptionFraction": "Fraction",
  "form.placeholders.singleChoiceImageOptionFraction": "50",
};

describe("<NumberInput />", () => {
  it("renders positive value", () => {
    const name = "number-test";

    const props = {
      name,
      value: "50",
    };

    const formikProps = {
      onSubmit: jest.fn(),
      initialValues: {
        [name]: "50",
      },
    };

    const {asFragment} = render(
      <MuiThemeProvider theme={createMuiTheme()}>
        <IntlProvider locale="en" messages={i18n}>
          <Formik {...formikProps}>
            <NumberInput {...props} />
          </Formik>
        </IntlProvider>
      </MuiThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders negative value", () => {
    const name = "number-test";

    const props = {
      name,
      value: "-50",
    };

    const formikProps = {
      onSubmit: jest.fn(),
      initialValues: {
        [name]: "-50",
      },
    };

    const {asFragment} = render(
      <MuiThemeProvider theme={createMuiTheme()}>
        <IntlProvider locale="en" messages={i18n}>
          <Formik {...formikProps}>
            <NumberInput {...props} />
          </Formik>
        </IntlProvider>
      </MuiThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
