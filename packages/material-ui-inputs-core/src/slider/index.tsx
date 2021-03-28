import React, {ChangeEvent, FC} from "react";
import {useIntl} from "react-intl";
import {getIn, useFormikContext} from "formik";

import {FormControlLabel, Slider, SliderProps} from "@material-ui/core";

import {IRequireName} from "../props";

export interface ISliderInputProps extends IRequireName {
  label?: string;
}

export const SliderInput: FC<ISliderInputProps & SliderProps> = props => {
  const {name, label, ...rest} = props;

  const suffix = name.split(".").pop() as string;

  const formik = useFormikContext<any>();
  const value = getIn(formik.values, name);

  const {formatMessage} = useIntl();
  const localizedLabel = label ?? formatMessage({id: `form.labels.${suffix}`});

  return (
    <FormControlLabel
      control={
        <Slider
          name={name}
          value={value}
          onChange={(_event: ChangeEvent<unknown>, value): void => {
            formik.setFieldValue(name, value);
          }}
          onBlur={formik.handleBlur}
          {...rest}
        />
      }
      label={localizedLabel}
    />
  );
};
