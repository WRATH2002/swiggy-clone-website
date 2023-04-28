import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonMenu = () => {
  return (
    <>
      <div>
        <Skeleton className="restaurant-image" />
      </div>
    </>
  );
};

export default SkeletonMenu;
