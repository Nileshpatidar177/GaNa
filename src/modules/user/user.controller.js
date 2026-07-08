import { validationResult } from "express-validator";

import {
  getUserProfileService,
  updateUserProfileService,
  changePasswordService,
  deleteUserAccountService,
  getUserDashboardService,
  getUserStatsService,
} from "./user.service.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await getUserProfileService(req.user._id);

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const user = await updateUserProfileService(req.user._id, req.body);

    return res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    await changePasswordService(
      req.user._id,
      req.body.oldPassword,
      req.body.newPassword
    );

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUserAccount = async (req, res) => {
  try {
    await deleteUserAccountService(req.user._id);

    return res.status(200).json({
      success: true,
      message: "User account deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserDashboard = async (req, res) => {
  try {
    const dashboard = await getUserDashboardService(req.user._id);

    return res.status(200).json({
      success: true,
      message: "User dashboard fetched successfully",
      data: dashboard,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserStats = async (req, res) => {
  try {
    const stats = await getUserStatsService(req.user._id);

    return res.status(200).json({
      success: true,
      message: "User stats fetched successfully",
      data: stats,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};