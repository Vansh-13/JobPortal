import express from "express";
const router = express.Router();
import isAuth from "../middleware/isAuth.middleware.js";
import { adminJob, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";


router.post("/postJob", isAuth, postJob);
router.get("/getJob", isAuth, getAllJobs);
router.get("/adminJob", isAuth, adminJob);
router.get("/getJob/:id", isAuth, getJobById);

export default router;