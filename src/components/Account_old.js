import React, { useState } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas/FormValidation";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const Account = () => {
  const [clicked, setClicked] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        // console.log(values);
        action.resetForm();
      },
    });

  console.log(clicked);
  return (
    <div className="account-form">
      <div className="account">
        <h1>Sign up</h1>
        <div className="form-outside"></div>
        <div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-container account-name">
              <label htmlFor="name" className="input-label">
                {clicked ? (
                  values.name.length !== 0 && errors.name && touched.name ? (
                    <p className="form-error input-label-size-2">
                      {errors.name}
                    </p>
                  ) : (
                    <p className="form-input-label input-label-size-2">Name</p>
                  )
                ) : (
                  <p className="form-input-label input-label-size">Name</p>
                )}
              </label>
              <input
                className="input-information"
                type="text"
                name="name"
                id="name"
                // placeholder="Name"
                autoComplete="off"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                onClick={() => setClicked(true)}
              />
            </div>
            <div className="form-container account-email">
              <label htmlFor="email" className="input-label">
                {values.email.length !== 0 && errors.email && touched.email ? (
                  <p className="form-error">{errors.email}</p>
                ) : (
                  <p>Email</p>
                )}
              </label>
              <input
                className="input-information"
                type="email"
                name="email"
                id="email"
                // placeholder="Email"
                autoComplete="off"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            <div className="form-container account-password">
              <label htmlFor="password" className="input-label">
                {values.password.length !== 0 &&
                errors.password &&
                touched.password ? (
                  <p className="form-error">{errors.password}</p>
                ) : (
                  <p>Password</p>
                )}
              </label>
              <input
                className="input-information"
                type="password"
                name="password"
                id="password"
                // placeholder="Password"
                autoComplete="off"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            <div className="form-container account-confirm-password">
              <label htmlFor="confirm_password" className="input-label">
                {values.confirm_password.length !== 0 &&
                errors.confirm_password &&
                touched.confirm_password ? (
                  <p className="form-error">{errors.confirm_password}</p>
                ) : (
                  <p>Confirm Password</p>
                )}
              </label>
              <input
                className="input-information"
                type="password"
                name="confirm_password"
                id="confirm_password"
                // placeholder="Confirm Password"
                autoComplete="off"
                value={values.confirm_password}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            <div>
              <input type="submit" name="submit" id="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
