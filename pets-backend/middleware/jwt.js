import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
///

//generate token for the user
export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const authToken = (req, res, next) => {
  //verify token in header authorization
  const token = req.headers["authorization"];
  if (!token) {
    res.status(403).json({
      message: "Unauthorized",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "invalid token or token expired" });
    }
    req.userId = decodedToken._id;
    req.email = decodedToken.email;
    req.password = decodedToken.password;
    req.name = decodedToken.name;
    next();
  });
};
