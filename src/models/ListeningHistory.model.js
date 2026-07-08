import mongoose from "mongoose";

const listeningHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    song: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      required: true,
    },

    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },

    playedAt: {
      type: Date,
      default: Date.now,
    },

    durationPlayed: {
      type: Number,
      default: 0, // seconds
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },

    device: {
      type: String,
      enum: ["web", "android", "ios"],
      default: "web",
    },
  },
  {
    timestamps: true,
  }
);

listeningHistorySchema.index({ user: 1, playedAt: -1 });
listeningHistorySchema.index({ song: 1 });
listeningHistorySchema.index({ artist: 1 });

const ListeningHistory = mongoose.model(
  "ListeningHistory",
  listeningHistorySchema
);

export default ListeningHistory;    