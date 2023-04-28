import { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const AccountHeader = () => {
    return (
      <>
        <h1 className="sign-up">{isLoggedIn ? "Login" : "Sign up"}</h1>
        <div>
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
      </>
    );
  };

  return (
    <div className="">
      <AccountHeader />
      <div className="cart-header-hr"></div>
      {isLoggedIn ? <Login /> : <Signup />}
    </div>
  );
};

export default Account;
