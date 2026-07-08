import {
  createLanguageService,
  getLanguagesService,
} from "./language.service.js";

export const createLanguage = async (req, res) => {
  try {
    const language = await createLanguageService(req.body);

    res.status(201).json({
      success: true,
      message: "Language created successfully",
      data: language,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getLanguages = async (req, res) => {
  try {
    const languages = await getLanguagesService();

    res.status(200).json({
      success: true,
      message: "Languages fetched successfully",
      data: languages,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};