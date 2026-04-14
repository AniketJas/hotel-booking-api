import imageDownloader from "image-downloader";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPhotoByLink = async (req, res) => {
  try {
    //upload photo by link
    const { link } = req.body;
    const newName = "photo" + Date.now() + ".jpg";

    await imageDownloader.image({
      url: link,
      dest: process.cwd() + "/uploads/" + newName,
    });
    res.status(201).json(newName);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const uploadPhoto = async (req, res) => {
  try {
    const uploadedFiles = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];

      const tempPath = file.path; // multer temp path
      const ext = path.extname(file.originalname); // safer than split
      const newPath = tempPath + ext;

      fs.renameSync(tempPath, newPath);

      const filename = path.basename(newPath);
      uploadedFiles.push(filename);
    }

    res.status(201).json(uploadedFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export {
  uploadPhotoByLink,
  uploadPhoto,
};