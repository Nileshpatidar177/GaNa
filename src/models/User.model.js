import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Basic Information
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
      default: "",
    },

    username: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      default: null,
    },

    phone: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    coverImage: {
      type: String,
      default: "",
    },

    dateOfBirth: {
      type: Date,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    // Role
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },

    // User Type
    userType: {
      type: String,
      enum: ["free", "premium"],
      default: "free",
    },

    // Authentication
    emailVerified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
      default: null,
    },

    otpExpiresAt: {
      type: Date,
      default: null,
    },

    // Account Status
    accountStatus: {
      type: String,
      enum: [
        "active",
        "blocked",
        "deleted",
        "pending"
      ],
      default: "active",
    },

    // Login Info
    lastLogin: {
      type: Date,
    },

    refreshToken: {
      type: String,
      default: null,
    },

    // Subscription
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSubscription",
      default: null,
    },

    // Preferences
    language: {
      type: String,
      default: "English",
    },

    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "dark",
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

const User = mongoose.model("User", userSchema);

export default User;