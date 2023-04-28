import { useParams } from "react-router-dom";
import SkeletonUI from "./SkeletonUI";
import { IMG_CDN_URL } from "./Constant";
import useGetMenu from "../utils/useGetMenu";
import NonVegIcon from "../assets/img/non-veg-icon.png";
import VegIcon from "../assets/img/veg-icon.png";
import SkeletonMenu from "./SkeletonMenu";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getId, removeItem, showModal } from "../utils/cartSlice";
import Modal from "./Modal";
import { useState, useEffect } from "react";

const Menu = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  const [cartFood, setCartFood] = useState();

  // useParams is used to read id from a dynamic URL
  const params = useParams();
  const restaurantInfo1 = useGetMenu(params.id);
  const restaurantInfo = restaurantInfo1?.cards[0]?.card?.card?.info;

  console.log(
    restaurantInfo1?.cards[2]?.groupedCard.cardGroupMap?.REGULAR?.cards[1].card
      ?.card?.itemCards
  );
  const dispatch = useDispatch();

  const addItemHandler = item => {
    dispatch(addItem(item));
    dispatch(getId(params.id));
  };
  const removeItemHandler = item => dispatch(removeItem(item));

  const qty = useSelector(store => store.cart.qty);
  const cartItems = useSelector(store => store.cart.items);
  const ids = cartItems.map(item => item.id);

  let restaurantId = useSelector(store => store.cart.id);

  let showModalUse = useSelector(store => store.cart.modalVisibility);

  const showModalHandler = () => dispatch(showModal());

  const uniqueCartItemsId = cartItems
    .filter(({ id }, index) => !ids.includes(id, index + 1))
    .map(item => item.id);

  return !restaurantInfo ? (
    <SkeletonUI />
  ) : (
    <>
      <div className="restaurant-info">
        <div className="restaurant-header">
          <div className="restaurant-image">
            <img
              className="restaurant-image"
              // src={IMG_CDN_URL + restaurantInfo?.cloudinaryImageId}
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
                {restaurantInfo?.locality}, {restaurantInfo?.area}
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
                  {restaurantInfo?.costForTwoMsg}
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
                    {Object.values(restaurantInfo?.menu?.items).length} ITEMS
                  </p>
                </center>
              </h4>
            </span>
          </div>
          {/* Inserting Modal  */}
          {showModalUse && <Modal cartFood={cartFood} id={params.id} />}

          <div className="menu-list instamart-font">
            {Object.values(restaurantInfo?.menu?.items).map(item => {
              return (
                <div key={item?.id}>
                  <div className="menu">
                    <div className="item-image">
                      {item?.cloudinaryImageId === "" ||
                      item?.cloudinaryImageId === undefined ? (
                        ""
                      ) : (
                        <img
                          className="item-image"
                          src={IMG_CDN_URL + item?.cloudinaryImageId}
                          alt={item.name}
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="item-specs">
                      <p className="item-veg-classifier">
                        {item?.isVeg === 1 ? (
                          <img className="img-veg-icon" src={VegIcon} />
                        ) : (
                          <img className="img-veg-icon" src={NonVegIcon} />
                        )}
                      </p>
                      <h3 className="item-name">
                        <b>{item?.name}</b>
                      </h3>
                      <p className="item-price">&#8377;{item?.price / 100}</p>
                      <p className="item-description">{item?.description}</p>
                    </div>
                    {/* ADD & REMOVE BUTTON LOGIC */}

                    <div>
                      {!uniqueCartItemsId.includes(item.id) && (
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
                      {uniqueCartItemsId.includes(item.id) && (
                        <div className="item-quantity">
                          <button
                            className="decrease-qty qty-modify-btn"
                            onClick={() => removeItemHandler(item)}
                          >
                            <div className="decrease-size"></div>
                          </button>
                          <span className="qty">
                            {qty[[0].toString(item?.id)][item?.id]}
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
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
