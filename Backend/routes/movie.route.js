import express from "express";

import {
  getUpcomingMovie,
  getYoutubeVideobyID,
} from "../controllers/movie.controller.js";
import { getMovieTrailers } from "../controllers/movie.controller.js";
import { getTrendingMovies } from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/upcoming", getUpcomingMovie);
router.get("/:id/similar", getMovieTrailers);
router.get("/trending", getTrendingMovies);
router.get("/:id", getYoutubeVideobyID);

export default router;
