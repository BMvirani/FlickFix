import React, { useEffect, useState } from "react";
import GetMovieBannerVideo from "../services/GetMovieBannerVideo";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import HomeSkeleton from "./loaders/HomeSkeleton";

const MainVideoBg = ({ mainVideoInfo, moviePage,trailerPage }) => {
  const [movieTrailerInfo, setMovieTrailerInfo] = useState(null);
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);
  const router = useRouter();
  useEffect(() => {
    GetMovieBannerVideo(mainVideoInfo?.id);
  }, [mainVideoInfo]);


  const[rootLoader,setRootLoader ] = useState(true);
  useEffect(() => {
    if (trailerVideo) {
      setMovieTrailerInfo(trailerVideo[0]);
      setRootLoader(false)
    }
  }, [trailerVideo]);
  


  return (
    <>
   {!rootLoader? <>
    {movieTrailerInfo && 
      <div className={`main-tariler-box ${trailerPage ? "trailer-page-box":""}`}>
        <iframe
          src={`https://www.youtube.com/embed/${movieTrailerInfo?.key}?&autoplay=1&mute=${trailerPage?0:1}&loop=1&playlist=${movieTrailerInfo?.key}`}
          title="YouTube video player"
          // frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          width={100}
        ></iframe>
      </div>}
      {!moviePage && (
        <div className="main-tlr-info-box">
          <div className="info-text-wrap">
            <h1>{mainVideoInfo?.original_title}</h1>
            <p>{mainVideoInfo?.overview?.split(".").slice(0, 2).join(".")}</p>
          </div>

          <div className="info-btn-wrap">
            <button className="info-play-btn" onClick={()=>router.push(`/movie/${mainVideoInfo?.id}`)}>
              <i class="bi bi-play-fill"></i> <span>Play</span>
            </button>
            <button className="info-moreinfo-btn" onClick={()=>router.push(`/movie/${mainVideoInfo?.id}`)}>
              <i class="bi bi-info-circle"></i> <span>More Info</span>
            </button>
          </div>
        </div>
      )}
      </>:<><HomeSkeleton /></>}
    </>
  );
};

export default MainVideoBg;
