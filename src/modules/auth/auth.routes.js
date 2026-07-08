import express from "express";

import {
  registerUser,
  loginUser,
  registerArtist,
  loginArtist,
 sendOtpLogin,
  verifyOtpLogin,
} from "./auth.controller.js";

import {
  validateUserRegister,
  validateUserLogin,
  validateArtistRegister,
  validateOtp,
} from "./auth.validation.js";

const router = express.Router();

// User Auth
router.post("/user/register", validateUserRegister, registerUser);
router.post("/user/login", validateUserLogin, loginUser);

// Artist Auth
router.post("/artist/register", validateArtistRegister, registerArtist);
router.post("/artist/login", validateUserLogin, loginArtist);

// Admin OTP Auth
router.post("/send-otp", sendOtpLogin);
router.post("/verify-otp", validateOtp, verifyOtpLogin);

export default router;