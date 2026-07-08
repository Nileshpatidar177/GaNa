import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    targetType: {
      type: String,
      enum: ["song", "album", "playlist"],
      required: true,
    },

    song: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
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
  },
  {
    timestamps: true,
  }
);

likeSchema.index(
  { user: 1, song: 1 },
  { unique: true, sparse: true }
);

likeSchema.index(
  { user: 1, album: 1 },
  { unique: true, sparse: true }
);

likeSchema.index(
  { user: 1, playlist: 1 },
  { unique: true, sparse: true }
);

const Like = mongoose.model("Like", likeSchema);

export default Like;    