import PlaceModel from "../models/Place.js";
import jwt from "jsonwebtoken";

const getPlacesById = async (req, res) => {
  try {
    const { id } = req.params;
    const placeData = await PlaceModel.findById(id);
    res.status(200).json(placeData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const addPlace = async (req, res) => {
  try {
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
      res.status(200).json(placeDoc);
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const updatePlace = async (req, res) => {
  try {
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
        res.status(200).json("ok");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getPlacesByUserId = async (req, res) => {
  try {
    const { token } = req.cookies;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      const { id } = userData;
      const placeData = await PlaceModel.find({ owner: id });
      res.status(200).json(placeData);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getAllPlaces = async (req, res) => {
  try {
    const allPlaces = await PlaceModel.find();
    res.status(200).json(allPlaces);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export {
  getPlacesById,
  addPlace,
  updatePlace,
  getPlacesByUserId,
  getAllPlaces,
};