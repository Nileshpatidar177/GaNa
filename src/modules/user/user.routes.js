import express from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/role.middleware.js";

import {
  getUserProfile,
  updateUserProfile,
  changePassword,
  deleteUserAccount,
  getUserDashboard,
  getUserStats,
} from "./user.controller.js";

import {
  validateUpdateProfile,
  validateChangePassword,
} from "./user.validation.js";

const router = express.Router();

router.get(
  "/profile",
  authMiddleware,
  authorize("user"),
  getUserProfile
);

router.put(
  "/profile",
  authMiddleware,
  authorize("user"),
  validateUpdateProfile,
  updateUserProfile
);

router.patch(
  "/change-password",
  authMiddleware,
  authorize("user"),
  validateChangePassword,
  changePassword
);

router.delete(
  "/account",
  authMiddleware,
  authorize("user"),
  deleteUserAccount
);

router.get(
  "/dashboard",
  authMiddleware,
  authorize("user"),
  getUserDashboard
);

router.get(
  "/stats",
  authMiddleware,
  authorize("user"),
  getUserStats
);

export default router;