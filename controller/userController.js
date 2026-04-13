import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

const bcryptSalt = bcrypt.genSaltSync(8);

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await UserModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await UserModel.findOne({ email });
  // console.log(userDoc);
  if (userDoc) {
    const passOK = bcrypt.compareSync(password, userDoc.password);

    if (passOK) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not OK");
    }
  } else {
    // res.json("User not found");
    res.status(422).json("user not found");
  }
};

const getUser = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await UserModel.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
};

const logout = (req, res) => {
  res.cookie("token", "").json(true);
};

export {
  registerUser,
  loginUser,
  getUser,
  logout
};