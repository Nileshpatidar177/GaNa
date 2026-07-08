import Song from "../../models/Song.model.js";
import Artist from "../../models/Artist.model.js";
import Album from "../../models/Album.model.js";

export const getDashboardService = async () => {
  const totalSongs = await Song.countDocuments();
  const pendingSongs = await Song.countDocuments({
    approvalStatus: "pending",
  });

  const approvedSongs = await Song.countDocuments({
    approvalStatus: "approved",
  });

  const totalArtists = await Artist.countDocuments();

  const pendingArtists = await Artist.countDocuments({
    approvalStatus: "pending",
  });

  const verifiedArtists = await Artist.countDocuments({
    isVerified: true,
  });

  const totalAlbums = await Album.countDocuments();

  return {
    songs: {
      total: totalSongs,
      pending: pendingSongs,
      approved: approvedSongs,
    },
    artists: {
      total: totalArtists,
      pending: pendingArtists,
      verified: verifiedArtists,
    },
    albums: {
      total: totalAlbums,
    },
  };
};

export const getPendingSongsService = async () => {
  return await Song.find({
    approvalStatus: "pending",
    status: "active",
  })
    .populate("artist", "artistName profileImage")
    .populate("genre", "name")
    .populate("songLanguage", "name")
    .sort({ createdAt: -1 });
};

export const approveSongService = async (songId, adminId) => {
  const song = await Song.findById(songId);

  if (!song) throw new Error("Song not found");

  song.approvalStatus = "approved";
  song.status = "active";
  song.releaseDate = new Date();
  song.rejectionReason = "";
  song.approvedBy = adminId;
  song.approvedAt = new Date();

  song.approvalHistory.push({
    action: "approved",
    admin: adminId,
    reason: "",
  });

  await song.save();

  return song;
};

export const rejectSongService = async (songId, adminId, reason) => {
  const song = await Song.findById(songId);

  if (!song) throw new Error("Song not found");

  song.approvalStatus = "rejected";
  song.rejectionReason = reason;
  song.approvedBy = adminId;
  song.approvedAt = new Date();

  song.approvalHistory.push({
    action: "rejected",
    admin: adminId,
    reason,
  });

  await song.save();

  return song;
};
