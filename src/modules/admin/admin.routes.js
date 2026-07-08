import express from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/role.middleware.js";

import {
  getAdminDashboard,
  getPendingSongs,
  approveSong,
  rejectSong,
} from "./admin.controller.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/


// https://localhost:5000/api/admin
router.get(
  "/dashboard",
  authMiddleware,
  authorize("admin", "super_admin"),
  getAdminDashboard
);

/*
|--------------------------------------------------------------------------
| Song Management
|--------------------------------------------------------------------------
*/

router.get(
  "/songs/pending",
  authMiddleware,
  authorize("admin", "super_admin"),
  getPendingSongs
);

router.patch(
  "/songs/:id/approve",
  authMiddleware,
  authorize("admin", "super_admin"),
  approveSong
);

router.patch(
  "/songs/:id/reject",
  authMiddleware,
  authorize("admin", "super_admin"),
  rejectSong
);

export default router;