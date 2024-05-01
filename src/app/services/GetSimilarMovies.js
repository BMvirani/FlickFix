"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { OPTTIONS_TMDB_API } from "../utils/constants";
import apiroute from "./apiRoutes.json";
import store from "../store/store";
import {  addSimilarMovies } from "../store/moviesSlice";

const GetSimilarMovies = async (id) => {
  const url = apiroute?.similarMovies.replace("[ID]", id);

  try {
    const response = await axios.get(url, OPTTIONS_TMDB_API);
    store.dispatch(addSimilarMovies(response.data.results));
  } catch (error) {
    console.error("Error:", error);
  }

  return null;
};

export default GetSimilarMovies;
