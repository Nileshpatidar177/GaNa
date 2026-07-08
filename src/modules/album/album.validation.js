import { body } from "express-validator";

export const validateCreateAlbum = [
  body("title").trim().notEmpty().withMessage("Album title is required"),
  body("genre").trim().notEmpty().withMessage("Genre ID is required"),
  body("language").trim().notEmpty().withMessage("Language ID is required"),
  body("albumType")
    .optional()
    .isIn(["single", "ep", "album"])
    .withMessage("Invalid album type"),
];

export const validateUpdateAlbum = [
  body("title").optional().trim(),
  body("description").optional().trim(),
  body("albumType").optional().isIn(["single", "ep", "album"]),
  body("isPremiumOnly").optional().isBoolean(),
];