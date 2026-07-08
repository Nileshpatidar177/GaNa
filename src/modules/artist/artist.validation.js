import { body } from "express-validator";

export const validateUpdateArtistProfile = [
  body("artistName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Artist name cannot be empty"),

  body("bio")
    .optional()
    .trim(),

  body("socialLinks.instagram")
    .optional()
    .trim(),

  body("socialLinks.youtube")
    .optional()
    .trim(),

  body("socialLinks.spotify")
    .optional()
    .trim(),

  body("socialLinks.facebook")
    .optional()
    .trim(),

  body("socialLinks.website")
    .optional()
    .trim(),
];

export const validateWithdrawalRequest = [
  body("amount")
    .isNumeric()
    .withMessage("Amount must be a number")
    .custom((value) => value >= 1)
    .withMessage("Amount must be greater than 0"),

  body("bankDetails.accountHolderName")
    .trim()
    .notEmpty()
    .withMessage("Account holder name is required"),

  body("bankDetails.bankName")
    .trim()
    .notEmpty()
    .withMessage("Bank name is required"),

  body("bankDetails.accountNumber")
    .trim()
    .notEmpty()
    .withMessage("Account number is required"),

  body("bankDetails.ifscCode")
    .trim()
    .notEmpty()
    .withMessage("IFSC code is required"),
];

