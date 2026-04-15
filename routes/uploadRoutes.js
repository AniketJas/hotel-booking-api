import express from "express";
import * as photoController from "../controllers/photoController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.array("photos", 100), photoController.uploadPhoto);
router.post("/by-link", photoController.uploadPhotoByLink);
router.delete("/delete", photoController.deletePhoto);

export default router;