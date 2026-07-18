import { Router } from "express";
import { asyncHandler } from "../utils/async-handler";
import {
  getGenres,
  getMovieCredits,
  getMovieDetails,
  getMovieVideos,
  getMoviesByGenre,
  getPopular,
  getSimilarMovies,
  getTopRated,
  getTrending,
  getUpcoming,
  searchMovies,
} from "../controllers/movie.controller";

const router = Router();

router.get("/trending", asyncHandler(getTrending));
router.get("/popular", asyncHandler(getPopular));
router.get("/top-rated", asyncHandler(getTopRated));
router.get("/upcoming", asyncHandler(getUpcoming));
router.get("/search", asyncHandler(searchMovies));
router.get("/genres", asyncHandler(getGenres));
router.get("/genre/:genreId", asyncHandler(getMoviesByGenre));
router.get("/:id/videos", asyncHandler(getMovieVideos));
router.get("/:id/credits", asyncHandler(getMovieCredits));
router.get("/:id/similar", asyncHandler(getSimilarMovies));
router.get("/:id", asyncHandler(getMovieDetails));

export default router;
