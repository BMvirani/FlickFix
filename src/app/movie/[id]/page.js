"use client";
import MovieList from "@/app/components/MovieList";
import MainVideoBg from "@/app/components/mainVideoBg";
import GetMovieBannerVideo from "@/app/services/GetMovieBannerVideo";
import GetMovieDetails from "@/app/services/GetMovieDetails";
import GetSimilarMovies from "@/app/services/GetSimilarMovies";
import { formatMinutes } from "@/app/utils/constants";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const page = ({ params }) => {
  const [movieTrailerInfo, setMovieTrailerInfo] = useState(null);
  const [movieInfo, setMovieInfo] = useState(null);
  const movies = useSelector((store) => store.movies);

  const{data:session} = useSession()
useEffect(()=>{
  if(!session){
    redirect("/login")
  }
},[session])
  useEffect(() => {
    getMoviebannertrailer();
    GetMovieDetails(params.id);
    GetSimilarMovies(params.id);
  }, []);

  const getMoviebannertrailer = async () => {
    const res = await GetMovieBannerVideo(params.id);
  };

  useEffect(() => {
    if (movies.trailerVideo) {
      setMovieTrailerInfo(movies?.trailerVideo[0]);
      setMovieInfo(movies?.movieDetails);
    }
  }, [movies]);

  return (
    // <div className="home-bg">
    //   <div className="main-tariler-box">
    //     <iframe
    //       src={`https://www.youtube.com/embed/${movieTrailerInfo?.key}?&autoplay=1&mute=1&loop=1&playlist=${movieTrailerInfo?.key}`}
    //       title="YouTube video player"
    //       // frameborder="0"
    //       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    //       allowfullscreen
    //       width={100}
    //     ></iframe>
    //   </div>
    //   <div className="main-tlr- info-box">
    //     <div className="info-text-wrap">
    //       <h1>{movieInfo?.original_title}</h1>
    //       <p>{movieInfo?.overview}</p>
    //     </div>
    //     <div className="info-btn-wrap">
    //       <button className="info-play-btn">
    //         <i class="bi bi-play-fill"></i> <span>Play</span>
    //       </button>
    //       <button className="info-moreinfo-btn">
    //         <i class="bi bi-info-circle"></i> <span>More Info</span>
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <>
      <div className="movie-page-box">
        <MainVideoBg mainVideoInfo={movieInfo} moviePage={true} trailerPage={true}/>
        {movieInfo && (
          <div className="movie-details-box">
          <div className="movie-details-title-wrap d-flex align-items-center">
            <h1>{movieInfo?.title}</h1>
            <div className="movie-runtime">{formatMinutes(movieInfo?.runtime)}</div>
            <div className="rating-box">
              {Math.floor(movieInfo?.vote_average)}/10
              {" "} <i class="bi bi-star-fill"></i>
            </div>  
            </div>
            <p>{movieInfo?.overview?.split(".").slice(0, 2).join(".")}</p>

            <div className="genres-box">
              {movieInfo?.genres.map((item, index) => (
                <span className="genres">{item.name}</span>
              ))}
            </div>
          </div>
        )}
        <div className="similar-movies-box">
          <MovieList
            moviesData={movies?.similarMovies}
            title="Similar movies"
          />
        </div>
      </div>
    </>
  );
};

export default page;
