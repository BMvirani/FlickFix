"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { OPTTIONS_TMDB_API } from "../utils/constants";
import apiroute from "./apiRoutes.json";
import store from "../store/store";
import { addPopularMovies } from "../store/moviesSlice";

const GetPopularMovies = async () => {
  const url = apiroute?.popularMovies;

  try {
    const response = await axios.get(url, OPTTIONS_TMDB_API);
    store.dispatch(addPopularMovies(response.data.results));
  } catch (error) {
    console.error("Error:", error);
  }

  return null;
};

export default GetPopularMovies;
