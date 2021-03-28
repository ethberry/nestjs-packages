import React, {FC} from "react";

import {useMediaQuery, TextFieldProps, Theme} from "@material-ui/core";

import {TextInput} from "../text";
import {IRequireName} from "../props";

export interface ITextAreaProps extends IRequireName {}

export const TextArea: FC<ITextAreaProps & TextFieldProps> = props => {
  const isSmallScreen = useMediaQuery<Theme>(theme => theme.breakpoints.down("sm"));

  return <TextInput multiline rows={isSmallScreen ? 2 : 5} rowsMax={Infinity} {...props} />;
};
