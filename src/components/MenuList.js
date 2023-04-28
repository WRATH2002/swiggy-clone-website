import useGetMenu from "../utils/useGetMenu";

const MenuList = () => {
  let counter = 0;
  const restaurantDetails = useGetMenu(params.id);

  const menuDetails =
    restaurantDetails?.cards[2]?.groupedCard.cardGroupMap?.REGULAR?.cards;

  menuDetails.map(card => {
    return card?.card?.card?.itemCards?.map(item => {
      counter++;
      // console.log(counter);
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
                {item?.card?.info?.itemAttribute?.vegClassifier === "VEG" ? (
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
  });
};

export default MenuList;
