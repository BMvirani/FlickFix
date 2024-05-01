"use client";
import React, { useState } from "react";
import apiRoutes from "../../services/apiRoutes";
import axios from "axios";
import { OPTTIONS_TMDB_API } from "@/app/utils/constants";
import MovieCard from "@/app/components/MovieCard";
import { Skeleton, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const Expore = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [searchMoviesData, setSearchMoviesData] = useState(null);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    setShowSkeleton(true);
    e.preventDefault();
    GetSearchList();
  };

  const GetSearchList = async () => {
    const url = apiRoutes.searchMovie.replace("[QUERY]", searchQuery);
    try {
      const response = await axios.get(url, OPTTIONS_TMDB_API);
      if (response) {
        setSearchMoviesData(response.data.results);
        setShowSkeleton(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setShowSkeleton(false);
    }

    return null;
  };



  return (
    <div className="explore-bg">
      <div className="common-padding">
        <div className="container">
          <div className="inner-wrap">
            <div className="explore-search-box">
              <form action="" onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Search Movies "
                />
                
                {/* <button type="submit">Submit</button> */}
              </form>
            </div>
            <div className="explore-movies-list">
              {!showSkeleton ? (
                <>
                  {searchMoviesData?.length > 0 ? (
                    <>
                      {searchMoviesData?.map((item, index) => (
                        <MovieCard key={index} movieInfo={item} />
                      ))}
                    </>
                  ) : (
                    <div className="expore-default-msg">
                      Explore a world of films
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Spin
                    indicator={
                      <LoadingOutlined
                        style={{
                          fontSize: 30,
                          color:"#fff"
                        }}
                        spin
                      />
                    }
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expore;
