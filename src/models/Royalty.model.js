import mongoose from "mongoose";

const royaltySchema = new mongoose.Schema(
  {
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },

    song: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      required: true,
    },

    totalStreams: {
      type: Number,
      default: 0,
    },

    earningPerStream: {
      type: Number,
      default: 0.01,
    },

    totalEarnings: {
      type: Number,
      default: 0,
    },

    platformCommission: {
      type: Number,
      default: 0,
    },

    artistEarnings: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "hold"],
      default: "pending",
    },

    paidAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

royaltySchema.index({ artist: 1, song: 1 });
royaltySchema.index({ paymentStatus: 1 });

const Royalty = mongoose.model("Royalty", royaltySchema);

export default Royalty;