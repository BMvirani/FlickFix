"use client";
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ moviesData, title }) => {
  const [movieList, setMovieList] = useState([]);
  const [rootLoader, setRootLoader] = useState(true);
  useEffect(() => {
    setMovieList(moviesData);
    setTimeout(()=>{

      setRootLoader(false);
    },1000)
  }, [moviesData]);
  return (
    <>
    {!rootLoader ? 
    <div>
      <h2 className="movie-list-title"> {title}</h2>
      <div className="movie-list">
        {movieList?.map((item, index) => (
          <MovieCard key={index} movieInfo={item} />
        ))}
      </div>
    </div>:<></>
  }
    </>
  );
};

export default MovieList;
