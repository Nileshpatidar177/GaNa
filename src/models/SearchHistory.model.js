import mongoose from "mongoose";

const searchHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    query: {
      type: String,
      required: true,
      trim: true,
    },

    resultType: {
      type: String,
      enum: ["song", "artist", "album", "playlist", "all"],
      default: "all",
    },

    clickedResult: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    clickedResultType: {
      type: String,
      enum: ["song", "artist", "album", "playlist", "none"],
      default: "none",
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

searchHistorySchema.index({ user: 1, createdAt: -1 });
searchHistorySchema.index({ query: "text" });

const SearchHistory = mongoose.model("SearchHistory", searchHistorySchema);

export default SearchHistory;