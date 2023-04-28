import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FETCH_RESTAURANT_URL } from "./Constant";
import RestaurantCard from "./RestaurantCard";
import SkeletonUI from "./SkeletonUI";
import useOnline from "../utils/useOnline";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);

  useEffect(() => {
    getRestaurants();
  }, []);

  // Example/Use of componentWillUnmount
  // useEffect(() => {
  //   let timer = setInterval(() => {
  //     console.log("Print Timer");
  //   }, 1000);

  //   // Need to clear timer if it is needed to be called only once when "Home" screen is loaded
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);
  if (!allRestaurants) return null;

  function searchHandler(searchText, allRestaurants) {
    const filteredData = allRestaurants.filter(restaurant =>
      restaurant.data.name.toUpperCase().includes(searchText.toUpperCase())
    );
    setFilteredRestaurants(filteredData);
    // setSearchText("");
    // return filteredData;
  }

  async function getRestaurants() {
    const data = await fetch(FETCH_RESTAURANT_URL);
    const jsonData = await data?.json();

    setAllRestaurants(jsonData?.data?.cards?.[2]?.data?.data?.cards);
    setFilteredRestaurants(jsonData?.data?.cards?.[2]?.data?.data?.cards);
    return jsonData;
  }

  function displayRestaurants() {
    return (
      <div className="restaurant-list">
        {filteredRestaurants?.map(restaurant => {
          return (
            <Link
              to={/restaurant/ + restaurant.data.id}
              key={restaurant.data.id}
              className="remove-hyperlink link-pointer"
            >
              <RestaurantCard {...restaurant.data} />
            </Link>
          );
        })}
        {/* <RestaurantCard restaurant={RestaurantList[0].data} />
      <RestaurantCard restaurant={RestaurantList[1].data} />
      <RestaurantCard restaurant={RestaurantList[2].data} />
      <RestaurantCard restaurant={RestaurantList[3].data} />
      <RestaurantCard restaurant={RestaurantList[4].data} />
      <RestaurantCard restaurant={RestaurantList[5].data} />
      <RestaurantCard restaurant={RestaurantList[6].data} />
      <RestaurantCard restaurant={RestaurantList[7].data} />
      <RestaurantCard restaurant={RestaurantList[8].data} /> */}
      </div>
    );
  }

  // Early Return (Do not render component) --> To avoid UI break

  return allRestaurants?.length === 0 ? (
    <SkeletonUI />
  ) : (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input instamart-font"
          value={searchText}
          placeholder="Search for restaurants"
          spellCheck="false"
          onChange={e => {
            // console.log(e.target.value);
            setSearchText(e.target.value);
          }}
          onKeyDown={e => {
            if (e.key === "Enter") {
              searchHandler(searchText, allRestaurants);
            }
          }}
        ></input>
        <button
          className="search-btn instamart-font"
          onClick={() => {
            // const filteredData = searchHandler(searchText, RestaurantList);
            searchHandler(searchText, allRestaurants);
          }}
        >
          Search
        </button>
      </div>

      {filteredRestaurants.length === 0 ? (
        <div className="no-restaurant-found">
          <p className="not-found">No match found for "{searchText}"</p>
        </div>
      ) : (
        displayRestaurants()
      )}
    </>
  );
};
// const Body = () => {
//   return (
//     <div className="restaurant-list">
//       {RestaurantList.map(restaurant => {
//         return <RestaurantCard restaurant={restaurant.data} key={restaurant.data.id} />;
//       })}

export default Body;
