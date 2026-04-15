import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import placeRoutes from "./routes/placeRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

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

app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});