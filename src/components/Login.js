import React, { useState } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas/FormValidation";
import signup from "../assets/img/signup.png";
import showIcon from "../assets/img/show-icon.png";
import hideIcon from "../assets/img/hide-icon.png";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [clicked, setClicked] = useState({
    email: false,
    password: false,
  });

  const [passwordType, setPasswordType] = useState("password");

  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        action.resetForm();
      },
    });

  const submitForm = () => {
    const userObject = {
      email: values.email,
      password: values.password,
    };

    const getData = JSON.parse(localStorage.getItem(userObject.email));

    if (getData) {
      if (
        userObject.email === getData.email &&
        userObject.password === getData.password
      ) {
        navigate("/");
        // console.log("success");
      }
    } else console.log("Incorrect username or password");
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
            email: false,
            password: false,
          })
        }
      ></div>
      <div className="account">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="label-container">
              <label htmlFor="email" className="label-field">
                {clicked.email || values.email.length ? (
                  values.email.length &&
                  errors.email &&
                  (touched.email === undefined || touched.email) ? (
                    <p className="label-field-2 label-error">{errors.email}</p>
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
                // placeholder="Name"
                autoComplete="off"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                onClick={() =>
                  setClicked({
                    email: true,
                    password: false,
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
                    email: false,
                    password: true,
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
            <div>
              <button
                type="submit"
                name="submit"
                id="submit"
                className="btn-submit"
                onClick={submitForm}
              >
                LOG IN
              </button>
            </div>
          </form>
        </div>

        <div className="signup-img">
          <img src={signup} className="signup-img"></img>
        </div>
      </div>
    </>
  );
};

export default Login;
