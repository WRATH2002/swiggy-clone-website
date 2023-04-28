import { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import signup from "../assets/img/signup.png";

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const AccountHeader = () => {
    return (
      <div className="account-wrapper">
        <div className="account-header">
          <h1 className="sign-up">{isLoggedIn ? "Login" : "Sign up"}</h1>
          <div className="create-account">
            <h6>or</h6>
            <button
              className="signup-header"
              onClick={() => {
                setIsLoggedIn(!isLoggedIn);
              }}
            >
              {isLoggedIn ? "create a account" : "login to your account"}
            </button>
          </div>
          <div className="cart-header-hr"></div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="account-body">
        <div className="">
          <AccountHeader />
          {isLoggedIn ? <Login /> : <Signup />}
        </div>
        <div className="signup-img">
          <img src={signup} className="signup-img"></img>
        </div>
      </div>
      {/* <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br /> */}
    </>
  );
};

export default Account;
