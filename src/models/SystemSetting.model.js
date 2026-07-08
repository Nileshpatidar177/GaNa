import mongoose from "mongoose";

const systemSettingSchema = new mongoose.Schema(
  {
    platformName: {
      type: String,
      default: "Music Streaming Platform",
      trim: true,
    },

    logo: {
      type: String,
      default: "",
    },

    favicon: {
      type: String,
      default: "",
    },

    supportEmail: {
      type: String,
      default: "",
      trim: true,
    },

    maintenanceMode: {
      type: Boolean,
      default: false,
    },

    allowUserRegistration: {
      type: Boolean,
      default: true,
    },

    allowArtistRegistration: {
      type: Boolean,
      default: true,
    },

    artistApprovalRequired: {
      type: Boolean,
      default: true,
    },

    superAdminArtistApprovalRequired: {
      type: Boolean,
      default: true,
    },

    commissionPercentage: {
      type: Number,
      default: 20,
      min: 0,
      max: 100,
    },

    earningPerStream: {
      type: Number,
      default: 0.01,
    },

    minimumWithdrawalAmount: {
      type: Number,
      default: 500,
    },

    defaultCurrency: {
      type: String,
      default: "INR",
    },

    paymentGateway: {
      type: String,
      enum: ["razorpay", "stripe", "paypal", "manual"],
      default: "razorpay",
    },

    maxUploadSongSizeMB: {
      type: Number,
      default: 50,
    },

    allowedAudioFormats: {
      type: [String],
      default: ["mp3", "wav", "aac"],
    },

    allowedImageFormats: {
      type: [String],
      default: ["jpg", "jpeg", "png", "webp"],
    },

    privacyPolicyUrl: {
      type: String,
      default: "",
    },

    termsAndConditionsUrl: {
      type: String,
      default: "",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const SystemSetting = mongoose.model(
  "SystemSetting",
  systemSettingSchema
);

export default SystemSetting;