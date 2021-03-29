import React, {FC} from "react";
import {useFormikContext} from "formik";
import {FormControl, IconButton, InputLabel, Tooltip} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {FormattedMessage, useIntl} from "react-intl";

import {S3FileInput} from "@trejgun/material-ui-inputs-file-s3";

import useStyles from "./styles";

export interface IAvatarInputProps {
  name: string;
}

export const AvatarInput: FC<IAvatarInputProps> = props => {
  const {name} = props;

  const formik = useFormikContext<any>();
  const {formatMessage} = useIntl();
  const classes = useStyles();

  const onChange = (url: string) => {
    formik.setFieldValue(name, url);
  };

  const onDelete = () => {
    formik.setFieldValue(name, "");
  };

  if (formik.values[name]) {
    return (
      <FormControl fullWidth className={classes.root}>
        <InputLabel id="avatar-select-label" shrink className={classes.label}>
          <FormattedMessage id={`form.labels.${name}`} />
        </InputLabel>
        <Tooltip title={formatMessage({id: "form.tips.delete"})}>
          <IconButton aria-label="delete" onClick={onDelete} className={classes.button} size="medium">
            <Delete fontSize="inherit" />
          </IconButton>
        </Tooltip>
        <img src={formik.values[name]} className={classes.image} alt={`form.labels.${name}`} />
      </FormControl>
    );
  }

  return (
    <FormControl fullWidth className={classes.root}>
      <InputLabel id="avatar-select-label" shrink className={classes.label}>
        <FormattedMessage id={`form.labels.${name}`} />
      </InputLabel>
      <S3FileInput onChange={onChange} classes={{root: classes.input}} />
    </FormControl>
  );
};
