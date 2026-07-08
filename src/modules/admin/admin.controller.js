import {
  getDashboardService,
  getPendingSongsService,
  approveSongService,
  rejectSongService,
} from "./admin.service.js";

export const getAdminDashboard = async (req, res) => {
  try {
    const dashboard = await getDashboardService();

    return res.status(200).json({
      success: true,
      message: "Admin dashboard fetched successfully",
      data: dashboard,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPendingSongs = async (req, res) => {
  try {
    const songs = await getPendingSongsService();

    return res.status(200).json({
      success: true,
      message: "Pending songs fetched successfully",
      data: songs,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const approveSong = async (req, res) => {
  try {
const song = await approveSongService(req.params.id, req.user._id);
    return res.status(200).json({
      success: true,
      message: "Song approved successfully",
      data: song,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const rejectSong = async (req, res) => {
  try {
    const song = await rejectSongService(
  req.params.id,
  req.user._id,
  req.body.reason || "Rejected by admin"
);

    return res.status(200).json({
      success: true,
      message: "Song rejected successfully",
      data: song,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};