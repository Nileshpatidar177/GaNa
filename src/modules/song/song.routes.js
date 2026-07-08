import express from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/role.middleware.js";
import upload from "../../middlewares/upload.middleware.js";

import {
  uploadSong,
  updateSong,
  deleteSong,
  getSongById,
  getAllSongs,
  getTrendingSongs,
  getLatestSongs,
  likeSong,
  playSong,
} from "./song.controller.js";

import {
  validateUploadSong,
  validateUpdateSong,
} from "./song.validation.js";

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  authorize("artist"),
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  validateUploadSong,
  uploadSong
);

router.put(
  "/:id",
  authMiddleware,
  authorize("artist"),
  validateUpdateSong,
  updateSong
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("artist"),
  deleteSong
);

// /api/song

router.get("/", getAllSongs);

router.get("/trending", getTrendingSongs);

router.get("/latest", getLatestSongs);

router.get("/:id", getSongById);

router.patch(
  "/:id/like",
  authMiddleware,
  authorize("user"),
  likeSong
);

router.post(
  "/:id/play",
  authMiddleware,
  authorize("user"),
  playSong
);

export default router;