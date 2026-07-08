import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    followingArtist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },

    notificationsEnabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// A user can follow an artist only once
followSchema.index(
  {
    follower: 1,
    followingArtist: 1,
  },
  {
    unique: true,
  }
);

const Follow = mongoose.model("Follow", followSchema);

export default Follow;