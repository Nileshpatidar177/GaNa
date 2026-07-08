import { validationResult } from "express-validator";

import {
  getArtistProfileService,
  updateArtistProfileService,
  getArtistSongsService,
  getArtistAlbumsService,
  getArtistAnalyticsService,
  getArtistEarningsService,
  createWithdrawalRequestService,
  getArtistRoyaltiesService,
} from "./artist.service.js";

export const getArtistProfile = async (req, res) => {
  try {
    const artist = await getArtistProfileService(req.user._id);

    return res.status(200).json({
      success: true,
      message: "Artist profile fetched successfully",
      data: artist,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateArtistProfile = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const artist = await updateArtistProfileService(req.user._id, req.body);

    return res.status(200).json({
      success: true,
      message: "Artist profile updated successfully",
      data: artist,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getArtistSongs = async (req, res) => {
  try {
    const songs = await getArtistSongsService(req.user._id);

    return res.status(200).json({
      success: true,
      message: "Artist songs fetched successfully",
      data: songs,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getArtistAlbums = async (req, res) => {
  try {
    const albums = await getArtistAlbumsService(req.user._id);

    return res.status(200).json({
      success: true,
      message: "Artist albums fetched successfully",
      data: albums,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getArtistAnalytics = async (req, res) => {
  try {
    const analytics = await getArtistAnalyticsService(req.user._id);

    return res.status(200).json({
      success: true,
      message: "Artist analytics fetched successfully",
      data: analytics,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getArtistEarnings = async (req, res) => {
  try {
    const earnings = await getArtistEarningsService(req.user._id);

    return res.status(200).json({
      success: true,
      message: "Artist earnings fetched successfully",
      data: earnings,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const createWithdrawalRequest = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const withdrawal = await createWithdrawalRequestService(
      req.user._id,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Withdrawal request created successfully",
      data: withdrawal,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getArtistRoyalties = async (req, res) => {
  try {
    const royalties = await getArtistRoyaltiesService(req.user._id);

    return res.status(200).json({
      success: true,
      message: "Artist royalties fetched successfully",
      data: royalties,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};