import express from "express";
import {
  register,
  login,
  logout,
  updateProfile,
  updateAddress,
  getCurrentUser, 
} from "../controllers/user.controller.js";
import {
  sendOtpLogin,verifyOtpLogin
} from "../controllers/user.controller.js";
import isAuth from "../middleware/isAuth.middleware.js";
import upload from "../middleware/upload.middleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuth, logout);
router.post("/profile/update", isAuth, upload.single("resume"), updateProfile);
router.post("/address/update", isAuth, updateAddress); 
router.get("/me",isAuth,getCurrentUser);
router.post("/send-otp", sendOtpLogin);
router.post("/verify-otp", verifyOtpLogin);

export default router;
