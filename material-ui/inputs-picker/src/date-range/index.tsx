import React, { FC, ReactElement, Fragment } from "react";
import { useIntl } from "react-intl";
import { getIn, useFormikContext } from "formik";
import { TextField, TextFieldProps } from "@material-ui/core";
import { DateRangePicker, DateRange, DateRangeDelimiter } from "@material-ui/pickers";

interface IDateTimeInputProps {
  name: string;
  readOnly?: boolean;
  required?: boolean;
  onChange?: (dateRange: DateRange<Date> | null) => void;
}

export const DateRangeInput: FC<IDateTimeInputProps> = props => {
  const { name, ...rest } = props;

  const suffix = name.split(".").pop() as string;

  const formik = useFormikContext<any>();
  const value = getIn(formik.values, name);

  const { formatMessage } = useIntl();

  return (
    <DateRangePicker
      inputFormat="MM/dd/yyyy"
      startText={formatMessage({ id: `form.labels.${suffix}Start` })}
      endText={formatMessage({ id: `form.labels.${suffix}End` })}
      value={value}
      onChange={(dateRange: DateRange<Date> | null): void => {
        formik.setFieldValue(name, dateRange);
      }}
      renderInput={(startProps: TextFieldProps, endProps: TextFieldProps): ReactElement => {
        return (
          <Fragment>
            <TextField {...startProps} name={`${name}Start`} variant="standard" onBlur={formik.handleBlur} fullWidth />
            <DateRangeDelimiter> &raquo; </DateRangeDelimiter>
            <TextField {...endProps} name={`${name}End`} variant="standard" onBlur={formik.handleBlur} fullWidth />
          </Fragment>
        );
      }}
      {...rest}
    />
  );
};
