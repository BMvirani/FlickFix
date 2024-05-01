import { useEffect, useState } from "react";

export  const OPTTIONS_TMDB_API   = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWY0NGY4ZjRmOTFhYWUzZDFlODdjMDU1OTVlYTM2MCIsInN1YiI6IjY1OGM2NmNkNjcyOGE4NmRkMjI4MTA5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2F_tNOimnSv3OJGLMgB0-hek94lsSGhrb1bxowfqGhk",
  },
};

  export const IMG_CDN = "https://image.tmdb.org/t/p/w500";


 export function formatMinutes(minutes) {
    // Handle negative or zero minutes
    if (minutes <= 0) {
      return minutes + " minutes";
    }
  
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    // Add leading zeros for single-digit minutes
    const formattedMinutes = remainingMinutes.toString().padStart(2, "0");
  
    return `${hours} hr ${formattedMinutes} min`;
  }


  