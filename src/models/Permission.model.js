import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    module: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: [
        "dashboard",
        "users",
        "artists",
        "songs",
        "albums",
        "playlists",
        "subscriptions",
        "payments",
        "reports",
        "roles",
        "permissions",
        "settings",
        "notifications",
        "copyright",
      ],
    },

    action: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: [
        "create",
        "read",
        "update",
        "delete",
        "approve",
        "reject",
        "export",
        "manage",
      ],
    },

    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      // Example: users:create
    },

    description: {
      type: String,
      default: "",
      trim: true,
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

// Automatically generate permission name
permissionSchema.pre("validate", function (next) {
  this.name = `${this.module}:${this.action}`;
  next();
});

const Permission = mongoose.model("Permission", permissionSchema);

export default Permission;