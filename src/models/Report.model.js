import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    targetType: {
      type: String,
      enum: ["song", "artist", "album", "playlist", "user", "copyright"],
      required: true,
    },

    song: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      default: null,
    },

    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      default: null,
    },

    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      default: null,
    },

    playlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Playlist",
      default: null,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    reason: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    attachments: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: ["pending", "reviewing", "resolved", "rejected"],
      default: "pending",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    adminAction: {
      type: String,
      enum: ["none", "warning", "content_removed", "user_blocked", "artist_blocked"],
      default: "none",
    },

    resolutionNote: {
      type: String,
      default: "",
      trim: true,
    },

    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

reportSchema.index({ reportedBy: 1, createdAt: -1 });
reportSchema.index({ targetType: 1 });
reportSchema.index({ status: 1 });
reportSchema.index({ priority: 1 });

const Report = mongoose.model("Report", reportSchema);

export default Report;  