import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
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

    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      default: null,
    },

    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
      required: true,
    },

    songLanguage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Language",
      required: true,
    },

    audioUrl: {
      type: String,
      required: true,
    },

    coverImage: {
      type: String,
      default: "",
    },

    duration: {
      type: Number,
      required: true,
      // duration in seconds
    },

    lyrics: {
      type: String,
      default: "",
    },

    releaseDate: {
      type: Date,
      default: Date.now,
    },

    mood: {
      type: String,
      enum: ["happy", "sad", "romantic", "party", "devotional", "workout", "chill", "focus"],
      default: "chill",
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    copyrightStatus: {
      type: String,
      enum: ["pending", "approved", "rejected", "claimed"],
      default: "pending",
    },

    rejectionReason: {
      type: String,
      default: "",
    },

    totalPlays: {
      type: Number,
      default: 0,
    },

    totalLikes: {
      type: Number,
      default: 0,
    },

    totalShares: {
      type: Number,
      default: 0,
    },

    isExplicit: {
      type: Boolean,
      default: false,
    },

    isPremiumOnly: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "deleted"],
      default: "active",
    },

    approvalHistory: [
      {
        action: {
          type: String,
          enum: ["approved", "rejected"],
        },
        admin: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        reason: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    approvedAt: {
      type: Date,
      default: null,
    },
  },

  {
    timestamps: true,
  }
);

songSchema.index(
  { title: "text", tags: "text" },
  { language_override: "languageOverride" }
);

const Song = mongoose.model("Song", songSchema);

export default Song;