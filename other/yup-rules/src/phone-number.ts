import * as Yup from "yup";

export const phoneNumberValidationSchema = Yup.string().required("form.validations.valueMissing");
