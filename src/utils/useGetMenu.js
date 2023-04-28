import { useState, useEffect } from "react";
import { FETCH_MENU_URL } from "../components/Constant";

const useGetMenu = id => {
  const [restaurantInfo, setRestaurantInfo] = useState(null);

  useEffect(() => {
    getMenu();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function getMenu() {
    const data = await fetch(FETCH_MENU_URL + id);
    const jsonData = await data.json();
    // console.log(jsonData?.data?.cards[0]?.card?.card?.info);
    // setRestaurantInfo(jsonData?.data);
    setRestaurantInfo(jsonData?.data);
    // return jsonData;
  }

  return restaurantInfo;
};

export default useGetMenu;
