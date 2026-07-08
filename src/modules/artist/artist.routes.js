import express from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/role.middleware.js";

import {
  getArtistProfile,
  updateArtistProfile,
  getArtistSongs,
  getArtistAlbums,
  getArtistAnalytics,
  getArtistEarnings,
  createWithdrawalRequest,
  getArtistRoyalties,
} from "./artist.controller.js";

import {
  validateUpdateArtistProfile,
  validateWithdrawalRequest,
} from "./artist.validation.js";

const router = express.Router();

router.get(
  "/profile",
  authMiddleware,
  authorize("artist"),
  getArtistProfile
);

router.put(
  "/profile",
  authMiddleware,
  authorize("artist"),
  validateUpdateArtistProfile,
  updateArtistProfile
);

router.get(
  "/songs",
  authMiddleware,
  authorize("artist"),
  getArtistSongs
);

router.get(
  "/albums",
  authMiddleware,
  authorize("artist"),
  getArtistAlbums
);

router.get(
  "/analytics",
  authMiddleware,
  authorize("artist"),
  getArtistAnalytics
);

router.get(
  "/earnings",
  authMiddleware,
  authorize("artist"),
  getArtistEarnings
);

router.post(
  "/withdrawal",
  authMiddleware,
  authorize("artist"),
  validateWithdrawalRequest,
  createWithdrawalRequest
);

router.get(
  "/royalties",
  authMiddleware,
  authorize("artist"),
  getArtistRoyalties
);

export default router;