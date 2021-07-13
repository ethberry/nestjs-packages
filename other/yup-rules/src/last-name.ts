import * as Yup from "yup";

import {lastNameMinLength, lastNameMaxLength} from "@trejgun/constants-validation";

export const lastNameValidationSchema = Yup.string()
  .min(lastNameMinLength, "form.validations.tooShort")
  .max(lastNameMaxLength, "form.validations.tooLong")
  .required("form.validations.valueMissing");