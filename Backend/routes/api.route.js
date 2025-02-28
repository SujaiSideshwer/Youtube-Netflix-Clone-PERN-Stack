import express from "express";

import { signup } from "../controllers/auth.controller.js";
import { loginroute } from "../controllers/auth.controller.js";
import { logoutroute } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { authCheck } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", loginroute);

router.post("/logout", logoutroute);

router.get("/authCheck", protectRoute, authCheck);

export default router;
