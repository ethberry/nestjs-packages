import * as Yup from "yup";

export const confirmValidationSchema = Yup.string()
  .equals([Yup.ref("password")], "form.validations.patternMismatch")
  .required("form.validations.valueMissing");
