import express from "express";
import * as placesController from "../controllers/placesController.js";

const router = express.Router();

router.get("/user", placesController.getPlacesByUserId);
router.get("/:id", placesController.getPlacesById);
router.get("/", placesController.getAllPlaces);
router.post("/", placesController.addPlace);
router.put("/", placesController.updatePlace);

export default router;