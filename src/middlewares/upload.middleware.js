import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "music-app/others";
    let resourceType = "auto";

    if (file.fieldname === "audio") {
      folder = "music-app/songs/audio";
      resourceType = "video";
    }

    if (file.fieldname === "coverImage") {
      folder = "music-app/covers";
      resourceType = "image";
    }

    if (file.fieldname === "profileImage") {
      folder = "music-app/profiles";
      resourceType = "image";
    }

    return {
      folder,
      resource_type: resourceType,
      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "webp",
        "mp3",
        "wav",
        "aac",
        "m4a",
      ],
    };
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
});

export default upload;