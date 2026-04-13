import imageDownloader from "image-downloader";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPhotoByLink = async (req, res) => {
  //upload photo by link
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";

  await imageDownloader.image({
    url: link,
    dest: process.cwd() + "/uploads/" + newName,
  });
  res.json(newName);
};

const uploadPhoto = async (req, res) => {
  //upload photo from local device
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    console.log(req.files[i]);
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
}

export {
  uploadPhotoByLink,
  uploadPhoto,
};