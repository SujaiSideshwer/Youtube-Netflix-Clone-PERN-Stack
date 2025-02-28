import express from "express";
import { getSearchHistory } from "./search.route.js";
import { removeItemFromSearchHistory } from "./search.route.js";
import { searchMovie } from "./search.route.js";

export {
  searchMovie,
  getSearchHistory,
  removeItemFromSearchHistory,
} from "../controllers/search.controller.js";

const router = express.Router();

router.get("/movie/:query", searchMovie);

router.get("/history", getSearchHistory);

router.delete("/history/:id", removeItemFromSearchHistory);

export default router;
