import { validationResult } from "express-validator";
import {
  registerUserService,
  loginUserService,
  registerArtistService,
  sendOtpLoginService,
  verifyOtpLoginService,
} from "./auth.service.js";

// USER REGISTER
export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const data = await registerUserService(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// USER LOGIN
export const loginUser = async (req, res) => {
  try {
    const data = await loginUserService(req.body);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ARTIST REGISTER
export const registerArtist = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const data = await registerArtistService(req.body);

    return res.status(201).json({
      success: true,
      message: "Artist registered successfully. Waiting for approval.",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ARTIST LOGIN
export const loginArtist = async (req, res) => {
  try {
    const data = await loginUserService(req.body);

    if (data.user.role.name !== "artist") {
      return res.status(403).json({
        success: false,
        message: "Only artist can login here",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Artist logged in successfully",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ADMIN SEND OTP
export const sendOtpLogin = async (req, res) => {
  try {
    const data = await sendOtpLoginService(req.body);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyOtpLogin = async (req, res) => {
  try {
    const data = await verifyOtpLoginService(req.body);

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};