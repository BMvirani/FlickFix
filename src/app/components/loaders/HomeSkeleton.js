import { Skeleton } from "antd";
import React from "react";

const HomeSkeleton = () => {
  return (
    <>
      <div className="home-skeleton-wraper ">
        <Skeleton.Button active={true} className="main-video-skeleton"/>
      </div>
    </>
  );
};

export default HomeSkeleton;
