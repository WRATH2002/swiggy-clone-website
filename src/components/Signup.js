import React, { useState } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas/FormValidation";
import signup from "../assets/img/signup.png";
import showIcon from "../assets/img/show-icon.png";
import hideIcon from "../assets/img/hide-icon.png";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const Signup = () => {
  const [clicked, setClicked] = useState({
    name: false,
    email: false,
    password: false,
    confirm_password: false,
  });

  const [passwordType, setPasswordType] = useState("password");

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        // console.log(values);
        action.resetForm();
      },
    });

  const submitForm = () => {
    const userObject = {
      email: values.email,
      password: values.password,
    };

    values.email.length > 2 &&
      values.password === values.confirm_password &&
      values.name.length &&
      localStorage.setItem(values.email, JSON.stringify(userObject));
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
    return;
  };

  return (
    <>
      <div
        className="form-outer"
        onClick={() =>
          setClicked({
            name: false,
            email: false,
            password: false,
            confirm_password: false,
          })
        }
      ></div>
      <div className="account">
        <div>
          {/* <h1 className="sign-up">Sign up</h1>
          <button
            onClick={() => {
              console.log("ehllo");
            }}
            style={{ position: "relative" }}
          >
            or login to your account
          </button>
          <div className="cart-header-hr"></div> */}
          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="label-container">
                <label htmlFor="name" className="label-field">
                  {clicked.name || values.name.length ? (
                    values.name.length &&
                    errors.name &&
                    (touched.name === undefined || touched.name) ? (
                      <p className="label-field-2 label-error">{errors.name}</p>
                    ) : (
                      <p className="label-field-2">Name</p>
                    )
                  ) : (
                    <p className="label-field">Name</p>
                  )}
                </label>
                <input
                  className="input-field"
                  type="text"
                  name="name"
                  id="name"
                  // placeholder="Name"
                  autoComplete="off"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onClick={() =>
                    setClicked({
                      name: true,
                      email: false,
                      password: false,
                      confirm_password: false,
                    })
                  }
                />
              </div>
              <div className="label-container">
                <label htmlFor="email" className="label-field">
                  {clicked.email || values.email.length ? (
                    values.email.length &&
                    errors.email &&
                    (touched.email === undefined || touched.email) ? (
                      <p className="label-field-2 label-error">
                        {errors.email}
                      </p>
                    ) : (
                      <p className="label-field-2">Email</p>
                    )
                  ) : (
                    <p className="label-field">Email</p>
                  )}
                </label>
                <input
                  className="input-field"
                  type="email"
                  name="email"
                  id="email"
                  // placeholder="Email"
                  autoComplete="off"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onClick={() =>
                    setClicked({
                      name: false,
                      email: true,
                      password: false,
                      confirm_password: false,
                    })
                  }
                />
              </div>
              <div className="label-container">
                <label htmlFor="password" className="label-field">
                  {clicked.password || values.password.length ? (
                    values.password.length &&
                    errors.password &&
                    (touched.password === undefined || touched.password) ? (
                      <p className="label-field-2 label-error">
                        {errors.password}
                      </p>
                    ) : (
                      <p className="label-field-2">Password</p>
                    )
                  ) : (
                    <p className="label-field">Password</p>
                  )}
                </label>

                <input
                  className="input-password-field"
                  // type="password"
                  type={passwordType}
                  name="password"
                  id="password"
                  // placeholder="Password"
                  autoComplete="off"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onClick={() =>
                    setClicked({
                      name: false,
                      email: false,
                      password: true,
                      confirm_password: false,
                    })
                  }
                ></input>
                {values.password.length ? (
                  <button
                    className="btn-show-hide"
                    type="submit"
                    onClick={togglePassword}
                  >
                    {passwordType === "password" ? (
                      <img src={showIcon} className="btn-show-hide" />
                    ) : (
                      <img src={hideIcon} className="btn-show-hide" />
                    )}
                  </button>
                ) : null}
              </div>
              <div className="label-container">
                <label htmlFor="confirm_password" className="label-field">
                  {clicked.confirm_password ||
                  values.confirm_password.length ? (
                    values.confirm_password.length &&
                    errors.confirm_password &&
                    (touched.confirm_password === undefined ||
                      touched.confirm_password) ? (
                      <p className="label-field-2 label-error">
                        {errors.confirm_password}
                      </p>
                    ) : (
                      <p className="label-field-2">Confirm Password</p>
                    )
                  ) : (
                    <p className="label-field">Confirm Password</p>
                  )}
                </label>
                <input
                  className="input-field"
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  // placeholder="Confirm Password"
                  autoComplete="off"
                  value={values.confirm_password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onClick={() =>
                    setClicked({
                      name: false,
                      email: false,
                      password: false,
                      confirm_password: true,
                    })
                  }
                />
              </div>
              <div>
                <button
                  type="submit"
                  name="submit"
                  id="submit"
                  className="btn-submit"
                  onClick={submitForm}
                >
                  CONTINUE
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* <div className="signup-img">
          <img src={signup} className="signup-img"></img>
        </div> */}
      </div>
    </>
  );
};

export default Signup;
