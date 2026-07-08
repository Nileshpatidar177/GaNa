import { validationResult } from "express-validator";

import {
  uploadSongService,
  updateSongService,
  deleteSongService,
  getSongByIdService,
  getAllSongsService,
  getTrendingSongsService,
  getLatestSongsService,
  likeSongService,
  playSongService,
} from "./song.service.js";

export const uploadSong = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const song = await uploadSongService(req.user._id, req.body, req.files);

    return res.status(201).json({
      success: true,
      message: "Song uploaded successfully. Waiting for approval.",
      data: song,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSong = async (req, res) => {
  try {
    const song = await updateSongService(
      req.user._id,
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Song updated successfully",
      data: song,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSong = async (req, res) => {
  try {
    await deleteSongService(req.user._id, req.params.id);

    return res.status(200).json({
      success: true,
      message: "Song deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSongById = async (req, res) => {
  try {
    const song = await getSongByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Song fetched successfully",
      data: song,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllSongs = async (req, res) => {
  try {
    const songs = await getAllSongsService();

    return res.status(200).json({
      success: true,
      message: "Songs fetched successfully",
      data: songs,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTrendingSongs = async (req, res) => {
  try {
    const songs = await getTrendingSongsService();

    return res.status(200).json({
      success: true,
      message: "Trending songs fetched successfully",
      data: songs,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getLatestSongs = async (req, res) => {
  try {
    const songs = await getLatestSongsService();

    return res.status(200).json({
      success: true,
      message: "Latest songs fetched successfully",
      data: songs,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const likeSong = async (req, res) => {
  try {
    const result = await likeSongService(req.user._id, req.params.id);

    return res.status(200).json({
      success: true,
      message: result.liked
        ? "Song liked successfully"
        : "Song unliked successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const playSong = async (req, res) => {
  try {
    const result = await playSongService(
      req.user._id,
      req.params.id,
      req.body.device || "web"
    );

    return res.status(200).json({
      success: true,
      message: "Song play recorded successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};