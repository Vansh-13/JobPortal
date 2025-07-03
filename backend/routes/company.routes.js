import express from "express";
import { registerCompany, getCompany, getCompanyById,updateCompany } from "../controllers/company.controller.js";

import isAuth from "../middleware/isAuth.middleware.js";

const router = express.Router();

router.post("/registercom", isAuth, registerCompany);
router.post("/get", isAuth, getCompany);
router.post("/get/:id", isAuth, getCompanyById);
router.post("/update/:id", isAuth,  updateCompany);

export default router;
