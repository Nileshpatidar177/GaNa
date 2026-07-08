import mongoose from "mongoose";

const deviceSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    deviceId: {
      type: String,
      required: true,
      trim: true,
    },

    deviceType: {
      type: String,
      enum: ["web", "android", "ios"],
      default: "web",
    },

    deviceName: {
      type: String,
      default: "",
      trim: true,
    },

    ipAddress: {
      type: String,
      default: "",
    },

    userAgent: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastActiveAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

deviceSessionSchema.index({ user: 1, deviceId: 1 }, { unique: true });

const DeviceSession = mongoose.model("DeviceSession", deviceSessionSchema);

export default DeviceSession;