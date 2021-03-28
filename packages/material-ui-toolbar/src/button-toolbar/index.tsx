import React, {FC, Children, cloneElement, ReactElement} from "react";
import {Grid, ButtonProps, GridJustification} from "@material-ui/core";

import useStyles from "./styles";

export interface IButtonToolbarProps {
  className?: string;
  justify?: GridJustification;
}

export const ButtonToolbar: FC<IButtonToolbarProps> = ({children = [], ...props}) => {
  const classes = useStyles();

  const {className, justify = "flex-end"} = props;
  return (
    <Grid container justify={justify} className={className}>
      {Children.map(children as Array<any>, (checkbox: ReactElement<ButtonProps>) =>
        cloneElement(checkbox, {
          className: classes[justify],
        }),
      )}
    </Grid>
  );
};
