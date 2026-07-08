import Genre from "../../models/Genre.model.js";

export const createGenreService = async (data) => {
  const existing = await Genre.findOne({ name: data.name });
  if (existing) throw new Error("Genre already exists");

  return await Genre.create(data);
};

export const getGenresService = async () => {
  return await Genre.find({ status: "active" }).sort({ name: 1 });
};