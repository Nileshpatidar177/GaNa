import { body } from "express-validator";

export const validateUploadSong = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Song title is required"),

  body("genre")
    .trim()
    .notEmpty()
    .withMessage("Genre ID is required"),

  body("language")
    .trim()
    .notEmpty()
    .withMessage("Song Language ID is required"),

  body("duration")
    .isNumeric()
    .withMessage("Duration must be a number"),

  body("mood")
    .optional()
    .isIn(["happy", "sad", "romantic", "party", "devotional", "workout", "chill", "focus"])
    .withMessage("Invalid mood"),

  body("isPremiumOnly")
    .optional()
    .isBoolean()
    .withMessage("isPremiumOnly must be true or false"),
];

export const validateUpdateSong = [
  body("title").optional().trim(),
  body("lyrics").optional().trim(),
  body("mood").optional(),
  body("tags").optional(),
  body("isPremiumOnly").optional().isBoolean(),
];