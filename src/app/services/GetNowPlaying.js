"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { OPTTIONS_TMDB_API } from "../utils/constants";
import apiroute from "./apiRoutes.json";
// import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../store/moviesSlice";
import store from "../store/store";

const GetNowPlaying = async () => {
  const url = apiroute?.nowPlayingMovies;

  try {
    const response = await axios.get(url, OPTTIONS_TMDB_API);
    store.dispatch(addNowPlayingMovies(response.data.results));
  } catch (error) {
    console.error("Error:", error);
  }

  return null;
};

export default GetNowPlaying;
