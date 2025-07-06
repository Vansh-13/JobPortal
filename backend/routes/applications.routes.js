
import express from "express";
import isAuth from "../middleware/isAuth.middleware.js";
import {
    applyJob,
    getApplicats,
    updateStatus,
    getApplication,
} from "../controllers/application.controller.js";

const router = express.Router();

router.post("/apply/:id", isAuth, applyJob);
router.get("/my-applications", isAuth, getApplication);
router.get("/:id/applicants", isAuth, getApplicats);
router.post("/status/:id/update", isAuth, updateStatus);

export default router;
