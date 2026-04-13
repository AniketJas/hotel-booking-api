import jwt from "jsonwebtoken";

export function getUserDataFromToken(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}