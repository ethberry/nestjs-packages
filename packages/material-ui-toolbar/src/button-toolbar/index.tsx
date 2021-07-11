import React, {FC, Children, cloneElement, ReactElement} from "react";
import {Grid, ButtonProps, GridJustification} from "@material-ui/core";

import useStyles from "./styles";

export interface IButtonToolbarProps {
  className?: string;
  justifyContent?: GridJustification;
}

export const ButtonToolbar: FC<IButtonToolbarProps> = ({children = [], ...props}) => {
  const classes = useStyles();

  const {className, justifyContent = "flex-end"} = props;
  return (
    <Grid container justifyContent={justifyContent} className={className}>
      {Children.map(children as Array<any>, (checkbox: ReactElement<ButtonProps>) =>
        cloneElement(checkbox, {
          className: classes[justifyContent],
        }),
      )}
    </Grid>
  );
};
