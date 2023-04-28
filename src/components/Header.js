import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import HungerrLogo from "../assets/img/Hungerr.png";
import { useSelector } from "react-redux";

const Logo = () => (
  <Link to="/">
    <div className="logo">
      <img className="logo" alt="logo" src={HungerrLogo}></img>
    </div>
  </Link>
);

const Header = () => {
  const cartItems = useSelector(store => store.cart.items);

  const handleCartLength = () => {
    let cartLength;
    if (cartItems.length === 0) {
      cartLength = "";
    } else if (cartItems.length >= 1 && cartItems.length <= 9) {
      cartLength = "cartLengthLess";
    } else if (cartItems.length >= 10) {
      cartLength = "cartLengthMore";
    }
    return cartLength;
  };

  return (
    <div className="nav-items">
      <Logo />
      <div className="list">
        <ul>
          <li className="header-class">
            <Link to="/" className="remove-hyperlink header-width-adjust">
              <i className="fa fa-home"></i>
              <h6 className="header-font">Home</h6>
            </Link>
          </li>

          <li className="header-class">
            <Link to="/about" className="remove-hyperlink header-width-adjust">
              <i className="fa fa-search"></i>
              <h6 className="header-font">About us</h6>
            </Link>
          </li>

          <li className="header-class">
            <Link to="/help" className="remove-hyperlink header-width-adjust">
              <i className="fa fa-question-circle"></i>
              <h6 className="header-font">Help</h6>
            </Link>
          </li>

          <li className="header-class">
            <Link
              to="/account"
              className="remove-hyperlink header-width-adjust"
            >
              <i className="fa fas fa-user-circle"></i>
              <h6 className="header-font">Account</h6>
            </Link>
          </li>

          {/* <li className="header-class">
            <Link
              to="/instamart"
              className="remove-hyperlink header-width-adjust"
            >
              <h6 className="header-font">Instamart</h6>
            </Link>
          </li> */}

          <li className="header-class cartClass">
            <Link
              to="/newcart"
              className="remove-hyperlink header-width-adjust"
            >
              <i className="fa fa-shopping-cart"></i>
              <div className={cartItems.length === 0 ? "" : "cartCount"}>
                {cartItems.length === 0 ? (
                  ""
                ) : (
                  <span className={handleCartLength()}>{cartItems.length}</span>
                )}
              </div>
              <h6
                className="header-font"
                style={cartItems.length === 0 ? {} : { marginLeft: "-18px" }}
              >
                Cart
              </h6>
            </Link>
          </li>

          <div className="cartClass">
            <li className="online">
              <h6 className="header-font">
                {useOnline() ? "Active " : "Offline "}
              </h6>
              <span
                className="active-icon"
                style={useOnline() ? { color: "green" } : { color: "red" }}
              >
                ●
              </span>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Header;
