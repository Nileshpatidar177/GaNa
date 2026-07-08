import { body } from "express-validator";

// =======================
// User Register Validation
// =======================

export const validateUserRegister = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required"),

  body("lastName")
    .optional()
    .trim(),

  body("username")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain one number")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain one special character"),
];

// =======================
// User Login Validation
// =======================

export const validateUserLogin = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

// =======================
// Artist Register Validation
// =======================

export const validateArtistRegister = [
  body("artistName")
    .trim()
    .notEmpty()
    .withMessage("Artist name is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

// =======================
// OTP Validation
// =======================

export const validateOtp = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required"),

  body("otp")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be 6 digits")
    .isNumeric()
    .withMessage("OTP must be numeric"),
];