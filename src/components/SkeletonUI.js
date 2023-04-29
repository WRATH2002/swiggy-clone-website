import SkeletonCard from "./SkeletonCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonUI = () => {
  return (
    <>
      <div className="skeletonSearch">
        <Skeleton height={50} width={606} />
      </div>
      <div className="skeletonUI">
        {Array(12)
          .fill("")
          .map((e, index) => {
            return (
              <div key={index}>
                <SkeletonCard />
              </div>
            );
          })}
        {/* <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard /> */}
      </div>
    </>
  );
};

export default SkeletonUI;
