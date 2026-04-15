import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isProd = process.env.NODE_ENV === "production";

    const placeId = req.body.placeId || "general";

    return {
      folder: `stayzy/${isProd ? "prod" : "dev"}/uploads`,
      allowed_formats: ["jpg", "png", "jpeg", "webp"],

      // 🔥 KEY PART
      public_id: `place_${placeId}_${Date.now()}`,

      resource_type: "image",
    };
  },
});

const upload = multer({ storage });

export default upload;