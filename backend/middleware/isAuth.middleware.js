import jwt from "jsonwebtoken";
import userModel from "../models/user.models.js";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = { userId: user._id }; // ✅ Yeh line required hai
    next();
  } catch (error) {
    console.error("isAuth error:", error);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

export default isAuth;
