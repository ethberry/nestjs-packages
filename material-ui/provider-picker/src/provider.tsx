import React, { FC } from "react";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";
import { LocalizationProvider as MuiPickersProvider } from "@material-ui/pickers";

export const PickerProvider: FC = ({ children }) => {
  return <MuiPickersProvider dateAdapter={DateFnsUtils}>{children}</MuiPickersProvider>;
};
