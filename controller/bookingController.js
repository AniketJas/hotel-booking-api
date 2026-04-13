import BookingModel from "../models/Booking.js";
import { getUserDataFromToken } from "../middleware/getUserDataFromToken.js";

const addBooking = async (req, res) => {
  const { place, checkIn, checkOut, noOfGuests, name, phno, price } = req.body;

  const userData = await getUserDataFromToken(req);
  BookingModel.create({
    place: place,
    user: userData.id,
    checkIn: checkIn,
    checkOut: checkOut,
    noOfGuests: noOfGuests,
    name: name,
    phno: phno,
    price: price,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
};

const getBookingByUserId = async (req, res) => {
  const userData = await getUserDataFromToken(req);
  res.json(await BookingModel.find({ user: userData.id }).populate("place"));
};

export {
  addBooking,
  getBookingByUserId,
};