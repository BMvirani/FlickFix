"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { OPTTIONS_TMDB_API } from "../utils/constants";
import apiroute from "./apiRoutes.json";
// import { useDispatch } from "react-redux";
import store from "../store/store";
import { addMovieDetails } from "../store/moviesSlice";

const GetMovieDetails = async (id) => {
  const url = apiroute?.movieDetails.replace("[ID]", id);

  try {
    const response = await axios.get(url, OPTTIONS_TMDB_API);
    store.dispatch(addMovieDetails(response.data));
  } catch (error) {
    console.error("Error:", error);
  }

  return null;
};

export default GetMovieDetails;
