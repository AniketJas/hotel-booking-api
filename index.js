import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import multer from "multer";
import morgan from "morgan";

import {
  getPlacesById,
  updatePlace,
  getPlacesByUserId,
  addPlace,
  getAllPlaces
} from "./controller/placesController.js";

import {
  addBooking,
  getBookingByUserId
} from "./controller/bookingController.js";

import {
  uploadPhotoByLink,
  uploadPhoto
} from "./controller/photoController.js";

import {
  registerUser,
  loginUser,
  getUser,
  logout
} from "./controller/userController.js";

import dotenv from "dotenv";

import { fileURLToPath } from "url";
import path from "path";

dotenv.config();
const port = process.env.PORT || 4000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(morgan('dev'));

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(__dirname + "/uploads/"));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.status(200).json("text ok");
});

app.post("/register", registerUser);
app.post("/login", loginUser);
app.get("/profile", getUser);
app.post("/logout", logout);

const photosMiddleware = multer({ dest: "uploads" });
app.post("/upload-by-link", uploadPhotoByLink);
app.post("/upload", photosMiddleware.array("photos", 100), uploadPhoto);

app.get("/user-places", getPlacesByUserId);
app.get("/places/:id", getPlacesById);
app.get("/places", getAllPlaces);
app.post("/places", addPlace);
app.put("/places", updatePlace);

app.post("/bookings", addBooking);
app.get("/bookings", getBookingByUserId);

app.listen(port, () => {
  console.log("Server is running on: http://localhost:" + port);
});
