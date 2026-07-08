import {
  createGenreService,
  getGenresService,
} from "./genre.service.js";

export const createGenre = async (req, res) => {
  try {
    const genre = await createGenreService(req.body);

    return res.status(201).json({
      success: true,
      message: "Genre created successfully",
      data: genre,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getGenres = async (req, res) => {
  try {
    const genres = await getGenresService();

    return res.status(200).json({
      success: true,
      message: "Genres fetched successfully",
      data: genres,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};