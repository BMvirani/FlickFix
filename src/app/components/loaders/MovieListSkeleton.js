import { Skeleton } from "antd";
import React from "react";

const MovieListSkeleton = () => {
  return (
    <div className="movie-list-skeleton-wrap">
    <div>
      <Skeleton.Button active={true} className="movie-card-title-skeleton" />
      </div>
      <div className="movie-card-list-skelton-box d-flex">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <>
          <div>
            <Skeleton.Button active={true} className="movie-card-skeleton" />
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default MovieListSkeleton;
