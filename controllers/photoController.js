import cloudinary from "../configs/cloudinary.js";

const uploadPhotoByLink = async (req, res) => {
  try {
    const { link } = req.body;

    const result = await cloudinary.uploader.upload(link, {
      folder: "stayzy-hotel-booking/uploads",
      transformation: [
        { width: 1280, crop: "limit" },
        { quality: "auto" },
        { fetch_format: "auto" },
      ],
    });

    res.status(201).json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const uploadPhoto = async (req, res) => {
  try {
    const uploadedFiles = [];

    // multer-storage-cloudinary already uploads files
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];

      uploadedFiles.push({
        url: file.path,
        public_id: file.filename,
      });
    }

    res.status(201).json(uploadedFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deletePhoto = async (req, res) => {
  try {
    const { public_id } = req.body;

    if (!public_id) {
      return res.status(400).json({ error: "public_id is required" });
    }

    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: "image",
    });

    return res.json({
      success: true,
      result,
    });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: "Failed to delete image" });
  }
};

export {
  uploadPhotoByLink,
  uploadPhoto,
  deletePhoto,
};