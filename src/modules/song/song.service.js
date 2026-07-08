import Artist from "../../models/Artist.model.js";
import Song from "../../models/Song.model.js";
import Like from "../../models/Like.model.js";
import ListeningHistory from "../../models/ListeningHistory.model.js";

export const uploadSongService = async (userId, data, files) => {
  const artist = await Artist.findOne({ user: userId });
  console.log("DAHSDHD: ",data)

  if (!artist) throw new Error("Artist profile not found");

  if (artist.approvalStatus !== "super_admin_approved") {
    throw new Error("Artist is not approved yet");
  }

  const audioUrl = files?.audio?.[0]?.path;
  const coverImage = files?.coverImage?.[0]?.path || "";

  if (!audioUrl) throw new Error("Audio file is required");

  const song = await Song.create({
    title: data.title,
    artist: artist._id,
    album: data.album || null,
    genre: data.genre,
    songLanguage: data.language,
    audioUrl,
    coverImage,
    duration: data.duration,
    lyrics: data.lyrics || "",
    mood: data.mood || "chill",
    tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
    isPremiumOnly: data.isPremiumOnly || false,
    approvalStatus: "pending",
    copyrightStatus: "pending",
  });

  return song;
};

export const updateSongService = async (userId, songId, data) => {
  const artist = await Artist.findOne({ user: userId });
  if (!artist) throw new Error("Artist profile not found");

  const song = await Song.findOne({
    _id: songId,
    artist: artist._id,
    status: { $ne: "deleted" },
  });

  if (!song) throw new Error("Song not found");

  const allowedFields = [
    "title",
    "lyrics",
    "mood",
    "tags",
    "isPremiumOnly",
  ];

  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      song[field] =
        field === "tags" && typeof data[field] === "string"
          ? data[field].split(",").map((tag) => tag.trim())
          : data[field];
    }
  });

  await song.save();
  return song;
};

export const deleteSongService = async (userId, songId) => {
  const artist = await Artist.findOne({ user: userId });
  if (!artist) throw new Error("Artist profile not found");

  const song = await Song.findOne({
    _id: songId,
    artist: artist._id,
    status: { $ne: "deleted" },
  });

  if (!song) throw new Error("Song not found");

  song.status = "deleted";
  await song.save();

  return true;
};

export const getSongByIdService = async (songId) => {
  const song = await Song.findById(songId)
    .populate("artist", "artistName profileImage isVerified")
    .populate("album", "title coverImage")
    .populate("genre", "name")
    .populate("songLanguage", "name");

  if (!song || song.status === "deleted") {
    throw new Error("Song not found");
  }

  return song;
};

export const getAllSongsService = async () => {
  return await Song.find({
    status: "active",
    approvalStatus: "approved",
  })
    .populate("artist", "artistName profileImage isVerified")
    .populate("genre", "name")
    .populate("songLanguage", "name")
    .sort({ createdAt: -1 });
};

export const getTrendingSongsService = async () => {
  return await Song.find({
    status: "active",
    approvalStatus: "approved",
  })
    .populate("artist", "artistName profileImage")
    .sort({ totalPlays: -1 })
    .limit(20);
};

export const getLatestSongsService = async () => {
  return await Song.find({
    status: "active",
    approvalStatus: "approved",
  })
    .populate("artist", "artistName profileImage")
    .sort({ releaseDate: -1 })
    .limit(20);
};

export const likeSongService = async (userId, songId) => {
  const song = await Song.findById(songId);
  if (!song || song.status === "deleted") throw new Error("Song not found");

  const existingLike = await Like.findOne({
    user: userId,
    targetType: "song",
    song: songId,
  });

  if (existingLike) {
    await Like.deleteOne({ _id: existingLike._id });
    song.totalLikes = Math.max(0, song.totalLikes - 1);
    await song.save();

    return { liked: false };
  }

  await Like.create({
    user: userId,
    targetType: "song",
    song: songId,
  });

  song.totalLikes += 1;
  await song.save();

  return { liked: true };
};

export const playSongService = async (userId, songId, device = "web") => {
  const song = await Song.findById(songId);
  if (!song || song.status === "deleted") throw new Error("Song not found");

  song.totalPlays += 1;
  await song.save();

  await ListeningHistory.create({
    user: userId,
    song: song._id,
    artist: song.artist,
    durationPlayed: song.duration,
    isCompleted: true,
    device,
  });

  return {
    totalPlays: song.totalPlays,
  };
};