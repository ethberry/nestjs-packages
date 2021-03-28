import React, {FC} from "react";
import {FormattedMessage} from "react-intl";

import {Grid, Typography} from "@material-ui/core";
import {ButtonToolbar} from "@trejgun/material-ui-toolbar";

import useStyles from "./styles";

interface IPageHeader {
  message: string;
  data?: any;
}

export const PageHeader: FC<IPageHeader> = ({children, message, data}) => {
  const classes = useStyles();
  return (
    <Grid className={classes.header} container justify="space-between" alignItems="center">
      <Grid item className={classes.wrapper}>
        <Typography component="h2" className={classes.title}>
          <FormattedMessage id={message} values={data} />
        </Typography>
      </Grid>

      <Grid item className={classes.buttons}>
        <ButtonToolbar>{children}</ButtonToolbar>
      </Grid>
    </Grid>
  );
};
