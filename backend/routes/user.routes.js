import express from "express";
import { register, login, logout, updateProfile } from "../controllers/user.controller.js";
import isAuth from "../middleware/isAuth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/profile/update", isAuth, updateProfile);
router.post("/logout", isAuth, logout);

export default router;
