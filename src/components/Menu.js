import { useParams } from "react-router-dom";
import SkeletonUI from "./SkeletonUI";
import { IMG_CDN_URL } from "./Constant";
import useGetMenu from "../utils/useGetMenu";
import NonVegIcon from "../assets/img/non-veg-icon.png";
import VegIcon from "../assets/img/veg-icon.png";
import SkeletonMenu from "./SkeletonMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  clearCart,
  getId,
  removeItem,
  showModal,
} from "../utils/cartSlice";
import Modal from "./Modal";
import { useState, useEffect } from "react";

const Menu = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  const [cartFood, setCartFood] = useState();

  // useParams is used to read id from a dynamic URL
  const params = useParams();
  const restaurantDetails = useGetMenu(params.id);
  const restaurantInfo = restaurantDetails?.cards[0]?.card?.card?.info;

  const menuDetails =
    restaurantDetails?.cards[2]?.groupedCard.cardGroupMap?.REGULAR?.cards;

  const dispatch = useDispatch();
  let counter = 0;

  const addItemHandler = item => {
    dispatch(addItem(item));
    dispatch(getId(params.id));
  };
  const removeItemHandler = item => dispatch(removeItem(item));

  const qty = useSelector(store => store.cart.qty);

  const cartItems = useSelector(store => store.cart.items);
  const ids = cartItems.map(item => item?.card?.info?.id);

  let restaurantId = useSelector(store => store.cart.id);

  let showModalUse = useSelector(store => store.cart.modalVisibility);

  const showModalHandler = () => dispatch(showModal());

  const uniqueCartItemsId = cartItems
    .filter((item, index) => !ids.includes(item?.card?.info?.id, index + 1))
    .map(item => item?.card?.info?.id);

  const countItem = menuDetails?.map(card => {
    card?.card?.card?.itemCards?.map(() => {
      counter++;
    });
    return counter;
  });

  return !restaurantInfo ? (
    <SkeletonUI />
  ) : (
    <>
      <div className="restaurant-info">
        <div className="restaurant-header">
          <div className="restaurant-image">
            <img
              className="restaurant-image"
              src={IMG_CDN_URL + restaurantInfo?.cloudinaryImageId}
              alt="Logo"
            />
          </div>
          <div className="restaurant-description">
            <div className="restaurant-about">
              <h2 className="font">
                <b>{restaurantInfo?.name}</b>
              </h2>
              <h4 className="font">{restaurantInfo?.cuisines.join(", ")}</h4>
              <h4 className="font">
                {restaurantInfo?.locality},{" "}
                {restaurantInfo?.sla?.lastMileTravelString}
              </h4>
            </div>
            <div className="restaurant-delivery">
              <div className="rating">
                <div className="menu-avg-rating">
                  <div className="fa fa-star star menu-star"></div>
                  <h6 className="font">{restaurantInfo?.avgRating}</h6>
                </div>

                <span className="font rating-description">
                  {restaurantInfo?.totalRatingsString}
                </span>
              </div>
              <div className="eta">
                <h6 className="font ">{restaurantInfo?.sla.slaString}</h6>
                <span className="font rating-description">Delivery Time</span>
              </div>
              <div className="costfortwo">
                <h6 className="font ">
                  {/* {restaurantInfo?.costForTwoMsg.split(" ")[0]} */}
                  {restaurantInfo?.costForTwoMessage}
                </h6>
                <span className="font rating-description">Cost for two</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="recommended">
            <span className="recommended-items">
              <h4 className="instamart-font">
                <b>Recommended</b>
                <center>
                  <p className="instamart-font total-items">
                    {countItem.slice(-1)} ITEMS
                  </p>
                </center>
              </h4>
            </span>
          </div>
          {/* Inserting Modal  */}
          {showModalUse && <Modal cartFood={cartFood} id={params.id} />}

          <div className="menu-list instamart-font">
            {menuDetails.map(card => {
              return card?.card?.card?.itemCards?.map(item => {
                return (
                  <div key={item?.card?.info?.id}>
                    <div className="menu">
                      <div className="item-image">
                        {item?.card?.info?.imageId === "" ||
                        item?.card?.info?.imageId === undefined ? (
                          ""
                        ) : (
                          <img
                            className="item-image"
                            src={IMG_CDN_URL + item?.card?.info?.imageId}
                            alt={item?.card?.info?.name}
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div className="item-specs">
                        <p className="item-veg-classifier">
                          {item?.card?.info?.itemAttribute?.vegClassifier ===
                          "VEG" ? (
                            <img className="img-veg-icon" src={VegIcon} />
                          ) : (
                            <img className="img-veg-icon" src={NonVegIcon} />
                          )}
                        </p>
                        <h3 className="item-name">
                          <b>{item?.card?.info?.name}</b>
                        </h3>
                        <p className="item-price">
                          &#8377;{item?.card?.info?.price / 100}
                        </p>
                        <p className="item-description">
                          {item?.card?.info?.description}
                        </p>
                      </div>

                      {/* ADD & REMOVE BUTTON LOGIC */}
                      <div>
                        {!uniqueCartItemsId.includes(item?.card?.info?.id) && (
                          <button
                            className="btn-add"
                            onClick={() => {
                              if (restaurantId.length === 0) {
                                addItemHandler(item);
                              } else if (restaurantId[0] === params.id) {
                                // console.log("Equal");
                                addItemHandler(item);
                              } else {
                                // console.log("Different Rest");
                                setCartFood(item);
                                showModalHandler();
                              }
                            }}
                          >
                            ADD
                          </button>
                        )}

                        {uniqueCartItemsId.includes(item?.card?.info?.id) && (
                          <div className="item-quantity">
                            <button
                              className="decrease-qty qty-modify-btn"
                              onClick={() => removeItemHandler(item)}
                            >
                              <div className="decrease-size"></div>
                            </button>
                            <span className="qty">
                              {
                                qty[[0].toString(item?.card?.info?.id)][
                                  item?.card?.info?.id
                                ]
                              }
                            </span>
                            <button
                              className="increase-qty qty-modify-btn"
                              onClick={() => addItemHandler(item)}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <hr className="hr" />
                  </div>
                );
              });
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
