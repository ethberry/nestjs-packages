import React, {FC, ReactElement} from "react";
import {InputBaseComponentProps, TextFieldProps} from "@material-ui/core";
import {getIn, useFormikContext} from "formik";

import {TextInput} from "../text";
import {IRequireName} from "../props";

export interface IStaticInputProps extends IRequireName {}

export const StaticInput: FC<IStaticInputProps & TextFieldProps> = props => {
  const {InputLabelProps, InputProps, name, ...rest} = props;

  const formik = useFormikContext<any>();

  return (
    <TextInput
      name={name}
      value={getIn(formik.values, name)}
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true,
      }}
      InputProps={{
        ...InputProps,
        inputComponent: ({value, placeholder, className}: InputBaseComponentProps): ReactElement => (
          <div className={className}>{value || placeholder}</div>
        ),
      }}
      {...rest}
    />
  );
};
