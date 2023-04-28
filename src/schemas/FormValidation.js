import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(25)
    .required("Enter your name"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Enter your Email address"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Enter password"),
  confirm_password: Yup.string()
    .required("Re-enter password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
