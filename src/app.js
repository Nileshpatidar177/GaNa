import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import artistRoutes from "./modules/artist/artist.routes.js";
import songRoutes from "./modules/song/song.routes.js";
import genreRoutes from "./modules/genre/genre.routes.js";
import languageRoutes from "./modules/language/language.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Music Streaming API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/artist", artistRoutes);
app.use("/api/song", songRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/languages", languageRoutes);
app.use("/api/admin", adminRoutes);

app.use((err, req, res, next) => {
  console.error("ERROR:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: err,
  });
});
export default app;