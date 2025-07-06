import express from "express";
import { registerCompany, getCompany, getCompanyById,updateCompany } from "../controllers/company.controller.js";

import isAuth from "../middleware/isAuth.middleware.js";

const router = express.Router();

router.post("/register", isAuth, registerCompany);
router.get("/get", isAuth, getCompany);
router.get("/get/:id", isAuth, getCompanyById);
router.put("/update/:id", isAuth,  updateCompany);

export default router;
