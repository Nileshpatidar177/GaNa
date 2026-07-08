import Artist from "../../models/Artist.model.js";
import Song from "../../models/Song.model.js";
import Album from "../../models/Album.model.js";
import Royalty from "../../models/Royalty.model.js";
import Withdrawal from "../../models/Withdrawal.model.js";
import ArtistAnalytics from "../../models/ArtistAnalytics.model.js";
import Genre from "../../models/Genre.model.js";
import Language from "../../models/Language.model.js";


export const getArtistProfileService = async (userId) => {
  const artist = await Artist.findOne({ user: userId })
    .populate("user", "-password -otp -refreshToken")
    .populate("genres")
    .populate("languages");

  if (!artist) throw new Error("Artist profile not found");

  return artist;
};

export const updateArtistProfileService = async (userId, data) => {
  const artist = await Artist.findOne({ user: userId });

  if (!artist) throw new Error("Artist profile not found");

  const allowedFields = [
    "artistName",
    "bio",
    "profileImage",
    "coverImage",
    "genres",
    "languages",
    "socialLinks",
  ];

  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      artist[field] = data[field];
    }
  });

  await artist.save();

  return artist;
};

export const getArtistSongsService = async (userId) => {
  const artist = await Artist.findOne({ user: userId });
  if (!artist) throw new Error("Artist profile not found");

  return await Song.find({
    artist: artist._id,
    status: { $ne: "deleted" },
  })
    .populate("genre", "name")
    .populate("language", "name")
    .sort({ createdAt: -1 });
};

export const getArtistAlbumsService = async (userId) => {
  const artist = await Artist.findOne({ user: userId });
  if (!artist) throw new Error("Artist profile not found");

  return await Album.find({
    artist: artist._id,
    status: { $ne: "deleted" },
  })
    .populate("genre", "name")
    .populate("language", "name")
    .sort({ createdAt: -1 });
};

export const getArtistAnalyticsService = async (userId) => {
  const artist = await Artist.findOne({ user: userId });
  if (!artist) throw new Error("Artist profile not found");

  const analytics = await ArtistAnalytics.find({ artist: artist._id })
    .sort({ date: -1 })
    .limit(30);

  return {
    artistSummary: {
      totalFollowers: artist.totalFollowers,
      monthlyListeners: artist.monthlyListeners,
      totalStreams: artist.totalStreams,
      totalEarnings: artist.totalEarnings,
      availableBalance: artist.availableBalance,
      approvalStatus: artist.approvalStatus,
      isVerified: artist.isVerified,
    },
    last30Days: analytics,
  };
};

export const getArtistEarningsService = async (userId) => {
  const artist = await Artist.findOne({ user: userId });
  if (!artist) throw new Error("Artist profile not found");

  const royalties = await Royalty.find({ artist: artist._id })
    .populate("song", "title coverImage")
    .sort({ createdAt: -1 });

  return {
    totalEarnings: artist.totalEarnings,
    availableBalance: artist.availableBalance,
    royalties,
  };
};

export const createWithdrawalRequestService = async (userId, data) => {
  const artist = await Artist.findOne({ user: userId });
  if (!artist) throw new Error("Artist profile not found");

  if (data.amount > artist.availableBalance) {
    throw new Error("Insufficient available balance");
  }

  const withdrawal = await Withdrawal.create({
    artist: artist._id,
    amount: data.amount,
    bankDetails: data.bankDetails,
    paymentMethod: data.paymentMethod || "bank_transfer",
  });

  artist.availableBalance -= data.amount;
  await artist.save();

  return withdrawal;
};

export const getArtistRoyaltiesService = async (userId) => {
  const artist = await Artist.findOne({ user: userId });
  if (!artist) throw new Error("Artist profile not found");

  return await Royalty.find({ artist: artist._id })
    .populate("song", "title coverImage totalPlays")
    .sort({ createdAt: -1 });
};