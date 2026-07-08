import Language from "../../models/Language.model.js";

export const createLanguageService = async (data) => {
  const existing = await Language.findOne({ code: data.code });
  if (existing) throw new Error("Language already exists");

  return await Language.create(data);
};

export const getLanguagesService = async () => {
  return await Language.find({ status: "active" }).sort({ name: 1 });
};