import express from "express";
import {
  createLanguage,
  getLanguages,
} from "./language.controller.js";

const router = express.Router();

// abhi testing ke liye open rakho
router.post("/", createLanguage);

router.get("/", getLanguages);

export default router;