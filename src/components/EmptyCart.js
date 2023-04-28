import { EMPTY_CART_URL } from "./Constant";

const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <center>
        <img src={EMPTY_CART_URL} className="empty-cart-img" />

        <div className="empty-cart-desc-1 instamart-font">
          Your cart is empty
        </div>
        <div className="empty-cart-desc-2 instamart-font">
          You can go to home page to view more restaurants
        </div>
      </center>
    </div>
  );
};

export default EmptyCart;
