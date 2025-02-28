import express from "express";
// import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/api.route.js";
import movieRoutes from "./routes/movie.route.js";
import searchRoutes from "./routes/search.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";

const app = express();
const port = ENV_VARS.BACKEND_SERVER_PORT;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

// app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server started at ${port}`);
  connectDB();
});
