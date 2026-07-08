import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },

    coverImage: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
      required: true,
    },

    language: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Language",
      required: true,
    },

    releaseDate: {
      type: Date,
      default: Date.now,
    },

    totalTracks: {
      type: Number,
      default: 0,
    },

    totalDuration: {
      type: Number,
      default: 0, // seconds
    },

    albumType: {
      type: String,
      enum: ["single", "ep", "album"],
      default: "album",
    },

    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    isPremiumOnly: {
      type: Boolean,
      default: false,
    },

    totalPlays: {
      type: Number,
      default: 0,
    },

    totalLikes: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "deleted"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

albumSchema.index(
  { title: "text" },
  { language_override: "languageOverride" }
);

const Album = mongoose.model("Album", albumSchema);

export default Album;