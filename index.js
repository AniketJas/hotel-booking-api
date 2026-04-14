import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import multer from "multer";
import morgan from "morgan";

import * as userController from "./controller/userController.js";
import * as bookingController from "./controller/bookingController.js";
import * as photoController from "./controller/photoController.js";
import * as placesController from "./controller/placesController.js";

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
  res.status(200).json("Welcome to Stayzy - Hotel Booking API");
});

app.post("/register", userController.registerUser);
app.post("/login", userController.loginUser);
app.get("/profile", userController.getUser);
app.post("/logout", userController.logout);

const photosMiddleware = multer({ dest: "uploads" });
app.post("/upload", photosMiddleware.array("photos", 100), photoController.uploadPhoto);
app.post("/upload-by-link", photoController.uploadPhotoByLink);

app.get("/user-places", placesController.getPlacesByUserId);
app.get("/places/:id", placesController.getPlacesById);
app.get("/places", placesController.getAllPlaces);
app.post("/places", placesController.addPlace);
app.put("/places", placesController.updatePlace);

app.post("/bookings", bookingController.addBooking);
app.get("/bookings", bookingController.getBookingByUserId);

app.listen(port, () => {
  console.log("Server is running on: http://localhost:" + port);
});
