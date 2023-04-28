import { IMG_CDN_URL } from "./Constant";

//* Config Driven UI

const RestaurantCard = ({
  cloudinaryImageId,
  name,
  cuisines,
  avgRating,
  slaString,
  costForTwoString,
}) => {
  let boxColor, starColor;
  const bgColor = () => {
    if (avgRating >= 4) boxColor = "#48c479";
    else if (avgRating >= 3 && avgRating < 4) boxColor = "#db7c38";
    else if (avgRating >= 2 && avgRating < 3) boxColor = "#e1b055";
    else if (avgRating >= 1 && avgRating < 2) boxColor = "#ec3838";
    else if (avgRating === "--") boxColor = "white";
    return boxColor;
  };

  const ratingColor = () => {
    if (avgRating === "--") starColor = "rgb(58, 60, 65)";
    else starColor = "white";

    return starColor;
  };

  return (
    <div className="card">
      <img src={IMG_CDN_URL + cloudinaryImageId} />
      <h3>
        <b>{name}</b>
      </h3>
      <h4>{cuisines.join(", ")}</h4>
      <div className="card-rating">
        <div
          className="star-box"
          style={{ backgroundColor: bgColor(), color: ratingColor() }}
        >
          <span className="star" style={{ color: ratingColor() }}>
            <span className="fa fa-star star"></span>
          </span>

          <span>
            <b>{avgRating}</b>
          </span>
        </div>

        <p className="dot-icon">•</p>
        <p>{slaString}</p>
        <p className="dot-icon">•</p>
        <p>{costForTwoString}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
