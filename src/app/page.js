"use client";

import { useEffect, useState } from "react";
import GetNowPlaying from "./services/GetNowPlaying";
import { useSelector } from "react-redux";
import MainVideoBg from "./components/mainVideoBg";
import MovieList from "./components/MovieList";
import GetPopularMovies from "./services/GetPopularMovies";
import GetTopRatedMovies from "./services/GetTopRatedMovies";
import GetUpComingMovies from "./services/GetUpComingMovies";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import HomeSkeleton from "./components/loaders/HomeSkeleton";

export default function Home() {
  const MoviesData = useSelector((store) => store.movies);
  const[rootLoader,setRootLoader] = useState(true);
  const [mainVideoInfo, setMainVideoInfo] = useState(null);

  const { data: session } = useSession();
  // useEffect(() => {
  //   if (!session) {
  //     redirect("/login");
  //   }
  // }, [session]);
  useEffect(() => {
    GetNowPlaying();
    GetPopularMovies();
    GetTopRatedMovies();
    GetUpComingMovies();
  }, []);

  useEffect(() => {
    if (MoviesData?.nowPlayingMovies) {
      const movieInfo = MoviesData?.nowPlayingMovies[0];
      setMainVideoInfo(movieInfo);
    }

    if(MoviesData){
      setRootLoader(false)
    }
  }, [MoviesData]);

  return (
    <>
      { !rootLoader ? (
        <>
          <div className="home-bg">
            {mainVideoInfo && (
              <MainVideoBg mainVideoInfo={mainVideoInfo} trailerPage={false} />
            )}

            <div className="">
              <div className="movie-list-wrap">
                <MovieList
                  moviesData={MoviesData?.nowPlayingMovies}
                  title="New Releases"
                />
                <MovieList
                  moviesData={MoviesData?.topRatedMovies}
                  title="Top Rated"
                />
                <MovieList
                  moviesData={MoviesData?.popularMovies}
                  title="Popular"
                />
                <MovieList
                  moviesData={MoviesData?.upComingMovies}
                  title="Upcoming"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
      <></>
      )}
    </>
  );
}
