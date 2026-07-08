import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/role.middleware.js";

import {
  createGenre,
  getGenres,
} from "./genre.controller.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  authorize("admin", "super_admin"),
  createGenre
);

router.get("/", getGenres);

export default router;