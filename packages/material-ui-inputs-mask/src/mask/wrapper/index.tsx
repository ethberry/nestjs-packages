import React, {FC} from "react";
import {IMaskInput} from "react-imask";
import {useFormikContext} from "formik";

export const MaskedInputWrapper: FC<any> = props => {
  const {inputRef, name, ...rest} = props;

  const formik = useFormikContext<any>();

  return (
    <IMaskInput
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      onAccept={(value: string) => formik.setFieldValue(name, value)}
      name={name}
      {...rest}
    />
  );
};
