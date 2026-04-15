import express from "express";
import * as bookingController from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", bookingController.addBooking);
router.get("/", bookingController.getBookingByUserId);

export default router;