import * as Yup from "yup";

import { confirmValidationSchema, passwordValidationSchema } from "@gemunionstudio/yup-rules";

export const validationSchema = Yup.object().shape({
  password: passwordValidationSchema,
  confirm: confirmValidationSchema,
});
