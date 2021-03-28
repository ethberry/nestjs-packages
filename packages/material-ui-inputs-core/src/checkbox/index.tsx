import React, {FC} from "react";
import {useIntl} from "react-intl";
import {useFormikContext, getIn} from "formik";

import {Checkbox, CheckboxProps, FormControlLabel} from "@material-ui/core";

import {IRequireName} from "../props";

export interface ICheckboxInputProps extends IRequireName {
  label?: string;
}

export const CheckboxInput: FC<ICheckboxInputProps & CheckboxProps> = props => {
  const {name, label, ...rest} = props;

  const suffix = name.split(".").pop() as string;

  const formik = useFormikContext<any>();
  const value = getIn(formik.values, name);

  const {formatMessage} = useIntl();
  const localizedLabel = label ?? formatMessage({id: `form.labels.${suffix}`});

  return (
    <FormControlLabel
      control={
        <Checkbox name={name} checked={value} onChange={formik.handleChange} onBlur={formik.handleBlur} {...rest} />
      }
      label={localizedLabel}
    />
  );
};
