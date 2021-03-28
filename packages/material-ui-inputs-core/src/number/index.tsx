import React, {FC, KeyboardEvent} from "react";
import {getIn, useFormikContext} from "formik";

import {TextFieldProps} from "@material-ui/core";

import {TextInput} from "../text";
import {IRequireName} from "../props";

export interface INumberInputProps extends IRequireName {
  readOnly?: boolean;
}

export const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
  if (e.keyCode === 69 || e.keyCode === 189 || (e.shiftKey && e.keyCode === 187)) {
    // disallow e/-/+
    e.preventDefault();
  }
};

export const NumberInput: FC<INumberInputProps & TextFieldProps> = props => {
  const {name, ...rest} = props;

  const formik = useFormikContext<any>();
  const value = getIn(formik.values, name);

  return (
    <TextInput
      type="number"
      onKeyDown={handleKeyDown}
      value={value === null && value === void 0 ? "" : Number(value)}
      name={name}
      {...rest}
    />
  );
};
