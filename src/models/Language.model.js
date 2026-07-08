import mongoose from "mongoose";

const languageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      // Example: hi, en, pa
    },

    nativeName: {
      type: String,
      default: "",
      trim: true,
      // Example: हिन्दी, English, ਪੰਜਾਬੀ
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

const Language = mongoose.model("Language", languageSchema);

export default Language;