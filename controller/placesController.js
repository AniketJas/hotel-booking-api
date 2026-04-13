import PlaceModel from "../models/Place.js";
import jwt from "jsonwebtoken";

const getPlacesById = async (req, res) => {
  const { id } = req.params;
  const placeData = await PlaceModel.findById(id);
  console.log(placeData);
  res.json(placeData);
};

const addPlace = async (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await PlaceModel.create({
      owner: userData.id,
      title: title,
      address: address,
      photos: addedPhotos,
      description: description,
      perks: perks,
      extraInfo: extraInfo,
      checkIn: checkIn,
      checkOut: checkOut,
      maxGuests: maxGuests,
      price: price,
    });
    console.log(placeDoc);
    res.json(placeDoc);
  });
};

const updatePlace = async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err;

    const placeDoc = await PlaceModel.findById(id);

    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title: title,
        address: address,
        photos: addedPhotos,
        description: description,
        perks: perks,
        extraInfo: extraInfo,
        checkIn: checkIn,
        checkOut: checkOut,
        maxGuests: maxGuests,
        price: price,
      });
      placeDoc.save();
      res.json("ok");
    }
  });
};

const getPlacesByUserId = async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    const { id } = userData;
    const placeData = await PlaceModel.find({ owner: id });
    console.log(placeData);
    res.json(placeData);
  });
};

const getAllPlaces = async (req, res) => {
  res.json(await PlaceModel.find());
};

export {
  getPlacesById,
  addPlace,
  updatePlace,
  getPlacesByUserId,
  getAllPlaces,
};