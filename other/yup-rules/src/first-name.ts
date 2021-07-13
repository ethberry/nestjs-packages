import * as Yup from "yup";

import {firstNameMaxLength, firstNameMinLength} from "@trejgun/constants-validation";

export const firstNameValidationSchema = Yup.string()
  .min(firstNameMinLength, "form.validations.tooShort")
  .max(firstNameMaxLength, "form.validations.tooLong")
  .required("form.validations.valueMissing");
