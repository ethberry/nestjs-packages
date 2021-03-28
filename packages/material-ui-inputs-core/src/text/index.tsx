import React, {FC} from "react";
import {useIntl} from "react-intl";
import {getIn, useFormikContext} from "formik";
import {TextField, TextFieldProps} from "@material-ui/core";

import {IRequireName} from "../props";

interface ITextInputProps extends IRequireName {
  readOnly?: boolean;
}

export const TextInput: FC<ITextInputProps & TextFieldProps> = props => {
  const {name, readOnly, InputProps, label, placeholder, ...rest} = props;

  const suffix = name.split(".").pop() as string;

  const formik = useFormikContext<any>();
  const error = getIn(formik.errors, name);
  const touched = getIn(formik.touched, name);
  const value = getIn(formik.values, name);

  const {formatMessage} = useIntl();
  const localizedLabel = label === void 0 ? formatMessage({id: `form.labels.${suffix}`}) : label;
  const localizedPlaceholder =
    placeholder === void 0 ? formatMessage({id: `form.placeholders.${suffix}`}) : placeholder;
  const localizedHelperText = error && touched ? formatMessage({id: error}, {label: localizedLabel}) : "";

  return (
    <TextField
      name={name}
      label={localizedLabel}
      placeholder={localizedPlaceholder}
      helperText={localizedHelperText}
      value={value}
      error={error && touched}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      InputProps={{
        ...InputProps,
        readOnly,
      }}
      fullWidth
      {...rest}
    />
  );
};
