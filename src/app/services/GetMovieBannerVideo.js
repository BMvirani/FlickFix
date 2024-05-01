import React from "react";
import { OPTTIONS_TMDB_API } from "../utils/constants";
import axios from "axios";
import { addTrailerVideo } from "../store/moviesSlice";
import store from "../store/store";

const GetMovieBannerVideo = async (mainVideoId) => {

  const url = `https://api.themoviedb.org/3/movie/${mainVideoId}/videos?language=en-US`;

  try {
    const response = await axios.get(url, OPTTIONS_TMDB_API);
    const allTrailer = response?.data?.results?.filter(
      (video) => video.type === "Trailer"
    );

    store.dispatch(addTrailerVideo(allTrailer));
  } catch (error) {
    console.error("Error:", error);
  }
  return <div>GetMovieBannerVideo</div>;
};

export default GetMovieBannerVideo;
