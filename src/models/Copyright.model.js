import mongoose from "mongoose";

const copyrightSchema = new mongoose.Schema(
  {
    song: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      required: true,
      unique: true,
    },

    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },

    copyrightOwner: {
      type: String,
      required: true,
      trim: true,
    },

    ownershipType: {
      type: String,
      enum: [
        "original",
        "licensed",
        "record_label",
        "public_domain"
      ],
      default: "original",
    },

    documentUrl: {
      type: String,
      default: "",
    },

    verificationStatus: {
      type: String,
      enum: [
        "pending",
        "admin_approved",
        "super_admin_approved",
        "rejected"
      ],
      default: "pending",
    },

    approvedByAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    approvedBySuperAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    rejectionReason: {
      type: String,
      default: "",
    },

    claimedBy: {
      type: String,
      default: "",
    },

    claimReason: {
      type: String,
      default: "",
    },

    isDisputed: {
      type: Boolean,
      default: false,
    },

    disputeStatus: {
      type: String,
      enum: [
        "none",
        "pending",
        "resolved",
        "rejected"
      ],
      default: "none",
    },
  },
  {
    timestamps: true,
  }
);

copyrightSchema.index({ artist: 1 });
copyrightSchema.index({ verificationStatus: 1 });

const Copyright = mongoose.model(
  "Copyright",
  copyrightSchema
);

export default Copyright;