"use client";
import Image from "next/image";
import React from "react";
import { IMG_CDN } from "../utils/constants";
import { useRouter } from "next/navigation";

const MovieCard = ({ movieInfo }) => {
const route = useRouter();
  const handleShowMovieInfo = (movieInfo)=>{
  route.push(`/movie/${movieInfo.id}`)
  }
  return (
    <div className="movie-card" onClick={()=>handleShowMovieInfo(movieInfo)}>
      <Image src={`${IMG_CDN + movieInfo?.poster_path}`} width={300} height={600} />
     </div>
  );
};

export default MovieCard;
