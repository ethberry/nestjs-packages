import * as Yup from "yup";

import {emailValidationSchema} from "@trejgun/yup-rules";

export const validationSchema = Yup.object().shape({
  email: emailValidationSchema,
});
