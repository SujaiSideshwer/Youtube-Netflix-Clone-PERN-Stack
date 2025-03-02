import express from "express";
import { getSearchHistory } from "../controllers/search.controller.js";
import { removeItemFromSearchHistory } from "../controllers/search.controller.js";
import { searchMovie } from "../controllers/search.controller.js";

const router = express.Router();

router.get("/movie/:query", searchMovie);

router.get("/history", getSearchHistory);

router.delete("/history/:id", removeItemFromSearchHistory);

export default router;
