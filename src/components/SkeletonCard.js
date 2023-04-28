import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonCard = () => {
  return (
    <>
      <div className="card " style={{ margin: "30px" }}>
        <Skeleton height={120} />
        <h3>
          <Skeleton height={60} />
        </h3>
        <h4>
          <Skeleton />
        </h4>
        <h4>
          <Skeleton />
        </h4>
      </div>
    </>
  );
};

export default SkeletonCard;
