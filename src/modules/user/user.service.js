import bcrypt from "bcryptjs";
import User from "../../models/User.model.js";
import Like from "../../models/Like.model.js";
import ListeningHistory from "../../models/ListeningHistory.model.js";
import Playlist from "../../models/Playlist.model.js";
import "../../models/UserSubscription.model.js";

export const getUserProfileService = async (userId) => {
  const user = await User.findById(userId)
    .select("-password -otp -refreshToken")
    .populate("role", "name displayName")
    .populate("subscription");

  if (!user) throw new Error("User not found");

  return user;
};

export const updateUserProfileService = async (userId, data) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "username",
    "phone",
    "profileImage",
    "coverImage",
    "dateOfBirth",
    "gender",
    "language",
    "theme",
    "notificationsEnabled",
  ];

  const updateData = {};

  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      updateData[field] = data[field];
    }
  });

  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  })
    .select("-password -otp -refreshToken")
    .populate("role", "name displayName");

  if (!user) throw new Error("User not found");

  return user;
};

export const changePasswordService = async (
  userId,
  oldPassword,
  newPassword
) => {
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new Error("Old password is incorrect");

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return true;
};

export const deleteUserAccountService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  user.accountStatus = "deleted";
  await user.save();

  return true;
};

export const getUserDashboardService = async (userId) => {
  const recentHistory = await ListeningHistory.find({ user: userId })
    .sort({ playedAt: -1 })
    .limit(10)
    .populate("song", "title coverImage duration")
    .populate("artist", "artistName profileImage");

  const playlists = await Playlist.find({
    owner: userId,
    status: "active",
  })
    .sort({ createdAt: -1 })
    .limit(10);

  const likedSongsCount = await Like.countDocuments({
    user: userId,
    targetType: "song",
  });

  return {
    recentHistory,
    playlists,
    likedSongsCount,
  };
};

export const getUserStatsService = async (userId) => {
  const totalLikedSongs = await Like.countDocuments({
    user: userId,
    targetType: "song",
  });

  const totalPlaylists = await Playlist.countDocuments({
    owner: userId,
    status: "active",
  });

  const totalListeningHistory = await ListeningHistory.countDocuments({
    user: userId,
  });

  return {
    totalLikedSongs,
    totalPlaylists,
    totalListeningHistory,
  };
};