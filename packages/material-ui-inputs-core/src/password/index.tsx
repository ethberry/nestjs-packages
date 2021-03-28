import React, {FC, useState, MouseEvent} from "react";

import {IconButton, InputAdornment, TextFieldProps} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";

import {TextInput} from "../text";
import {IRequireName} from "../props";

export interface IPasswordInputProps extends IRequireName {}

export const PasswordInput: FC<IPasswordInputProps & TextFieldProps> = props => {
  const [show, setShow] = useState(false);

  const handleClick = (e: MouseEvent): void => {
    e.preventDefault();
    setShow(!show);
  };

  return (
    <TextInput
      type={show ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton href="#" onClick={handleClick}>
              {show ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};
