import * as Yup from "yup";
import { emailValidationSchema } from "@gemunionstudio/yup-rules";

export const validationSchema = Yup.object().shape({
  email: emailValidationSchema,
});
