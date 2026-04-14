import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";

import upload from "./middleware/upload.js";

import * as userController from "./controller/userController.js";
import * as bookingController from "./controller/bookingController.js";
import * as photoController from "./controller/photoController.js";
import * as placesController from "./controller/placesController.js";

dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"], // scalable for multiple origins
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

app.post("/upload", upload.array("photos", 100), photoController.uploadPhoto);
app.post("/upload-by-link", photoController.uploadPhotoByLink);
app.delete("/delete-photo", photoController.deletePhoto); // New route for deleting photos

app.get("/user-places", placesController.getPlacesByUserId);
app.get("/places/:id", placesController.getPlacesById);
app.get("/places", placesController.getAllPlaces);
app.post("/places", placesController.addPlace);
app.put("/places", placesController.updatePlace);

app.post("/bookings", bookingController.addBooking);
app.get("/bookings", bookingController.getBookingByUserId);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});