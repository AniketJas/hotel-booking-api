import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

const bcryptSalt = bcrypt.genSaltSync(8);

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userDoc = await UserModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.status(200).json(userDoc);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
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

            const isProd = process.env.NODE_ENV === "production";

            res.cookie("token", token, {
              httpOnly: true,
              secure: isProd,
              sameSite: isProd ? "none" : "lax",
            }).json(userDoc);

            // res.cookie("token", token, {
            //   httpOnly: true,
            //   secure: true,
            //   sameSite: "none"
            // }).json(userDoc);
          }
        );
      } else {
        res.status(422).json("pass not OK");
      }
    } else {
      // res.json("User not found");
      res.status(422).json("user not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const getUser = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        if (err) throw err;
        const { name, email, _id } = await UserModel.findById(userData.id);
        res.status(200).json({ name, email, _id });
      });
    } else {
      res.status(422).json(null);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const logout = (req, res) => {
  const isProd = process.env.NODE_ENV === "production";

  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
  });
  res.status(200).json(true);
};

export {
  registerUser,
  loginUser,
  getUser,
  logout
};