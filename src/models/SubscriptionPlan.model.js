import mongoose from "mongoose";

const subscriptionPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    duration: {
      type: Number,
      required: true,
      // Days
    },

    currency: {
      type: String,
      default: "INR",
    },

    features: [
      {
        type: String,
      },
    ],

    maxDevices: {
      type: Number,
      default: 1,
    },

    audioQuality: {
      type: String,
      enum: ["standard", "high", "lossless"],
      default: "standard",
    },

    offlineDownload: {
      type: Boolean,
      default: false,
    },

    adFree: {
      type: Boolean,
      default: false,
    },

    isPopular: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const SubscriptionPlan = mongoose.model(
  "SubscriptionPlan",
  subscriptionPlanSchema
);

export default SubscriptionPlan;