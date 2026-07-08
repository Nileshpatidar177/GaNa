import { body } from "express-validator";

export const validateUpdateProfile = [
  body("firstName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("First name cannot be empty"),

  body("lastName")
    .optional()
    .trim(),

  body("username")
    .optional()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters"),

  body("phone")
    .optional()
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number must be between 10 and 15 digits"),

  body("gender")
    .optional()
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be male, female, or other"),

  body("language")
    .optional()
    .trim(),

  body("theme")
    .optional()
    .isIn(["light", "dark"])
    .withMessage("Theme must be light or dark"),
];

export const validateChangePassword = [
  body("oldPassword")
    .notEmpty()
    .withMessage("Old password is required"),

  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("New password must contain one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("New password must contain one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("New password must contain one number")
    .matches(/[!@#$%^&*]/)
    .withMessage("New password must contain one special character"),
];