import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NonVegIcon from "../assets/img/non-veg-icon.png";
import VegIcon from "../assets/img/veg-icon.png";
import useGetMenu from "../utils/useGetMenu";
import { IMG_CDN_URL } from "./Constant";
import EmptyCart from "./EmptyCart";
import { addItem, removeItem } from "../utils/cartSlice";
import CancellationPolicy from "../utils/CancellationPolicy";

const NewCart = () => {
  const dispatch = useDispatch();
  const addItemHandler = item => dispatch(addItem(item));
  const removeItemHandler = item => dispatch(removeItem(item));

  const cartItems = useSelector(store => store.cart.items);
  const qty = useSelector(store => store.cart.qty);
  const id = useSelector(store => store.cart.id);
  // console.log(id);

  const restaurantInfo1 = useGetMenu(id[0]);
  const restaurantInfo = restaurantInfo1?.cards[0]?.card?.card?.info;
  // console.log(restaurantInfo);
  const distance = restaurantInfo?.sla?.lastMileTravel;

  const uniqueCartItems = cartItems.filter(
    (item, i, cartItems) =>
      i ===
      cartItems.findIndex(item2 => item2.card?.info?.id === item.card?.info?.id)
  );

  // console.log(uniqueCartItems);
  const subTotal = uniqueCartItems.reduce((acc, curr) => {
    acc +=
      (curr.card?.info?.price / 100) *
      qty[[0].toString(curr?.card?.info?.id)][curr?.card?.info?.id];
    return acc;
  }, 0);

  return cartItems.length === 0 ? (
    <EmptyCart />
  ) : (
    <div className="cart-page">
      <div className="cart-position">
        {/* <div style={{ position: "relative" }}> */}
        <div>
          <Link to={"/restaurant/" + id[0]} className="remove-hyperlink">
            <div className="cart-header-wrap">
              <div className="cart-header">
                <img
                  className="cart-restaurant-image"
                  src={IMG_CDN_URL + restaurantInfo?.cloudinaryImageId}
                  alt="Logo"
                />
                <div className="cart-name-area">
                  <h5 className="cart-name">{restaurantInfo?.name}</h5>
                  <span className="cart-area">{restaurantInfo?.areaName}</span>
                  <div className="cart-header-hr" />
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="cart-middle">
          {uniqueCartItems.map(item => {
            return (
              <div className="cart" key={item?.card?.info?.id}>
                <div>
                  <p className="cart-veg-classifier">
                    {item?.card?.info?.itemAttribute?.vegClassifier ===
                    "VEG" ? (
                      <img className="cart-veg-icon" src={VegIcon} />
                    ) : (
                      <img className="cart-veg-icon" src={NonVegIcon} />
                    )}
                  </p>
                </div>
                <div className="cart-item-name instamart-font">
                  {item?.card?.info?.name}
                </div>
                <div className="cart-item-quantity">
                  <button
                    className="cart-decrease-qty qty-modify-btn"
                    onClick={() => removeItemHandler(item)}
                  >
                    <div className="decrease-size"></div>
                  </button>
                  <span className="cart-qty">
                    {
                      qty[[0].toString(item?.card?.info?.id)][
                        item?.card?.info?.id
                      ]
                    }
                  </span>
                  <button
                    className="cart-increase-qty qty-modify-btn"
                    onClick={() => addItemHandler(item)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-price instamart-font">
                  &#8377;
                  {(
                    (item?.card?.info?.price / 100) *
                    qty[[0].toString(item?.card?.info?.id)][
                      item?.card?.info?.id
                    ]
                  ).toFixed(2)}
                </div>
              </div>
            );
          })}
          {/* <div className="cart-hr"></div> */}
          <CancellationPolicy />
          <div className="instamart-font bill-wrapper">
            <div className="bill-detail" style={{ color: "black" }}>
              Bill Details
            </div>
            <div className="item-total bill-structure">
              <span>Item Total</span>
              <span>
                &#8377;
                {subTotal.toFixed(2)}
              </span>
            </div>
            <div className="delivery-fee bill-structure">
              <span>
                Delivery Fee | {restaurantInfo?.sla?.lastMileTravelString}
              </span>
              <span>
                <strike style={{ marginRight: "5px" }}>
                  &#8377;
                  {restaurantInfo?.feeDetails?.fees[0]?.fee / 100}
                </strike>
                <span style={{ color: "#f80" }}>FREE</span>
              </span>
            </div>
            <div style={{ margin: "0px 40px" }}>
              <hr></hr>
            </div>
            <div className="taxes bill-structure">
              <span>Govt. taxes & Other Charges</span>
              <span>&#8377;{(subTotal * 0.05).toFixed(2)}</span>
            </div>
          </div>
          <div className="cart-hr" />
        </div>

        <div className="subtotal">
          <span className="to-pay">TO PAY</span>
          <div className="total">
            &#8377;{Math.round(subTotal + subTotal * 0.05)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCart;
