import express from "express";
import { postJob, getAlljobs, getJobById, getAdminjobs, getTrendingJobsController, getJobAnalytics } from "../controllers/job.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.middleware.js"

const router = express.Router();


router.post("/post", isAuthenticated, postJob);
router.get("/get", isAuthenticated, getAlljobs);
router.get("/getadminjobs" ,isAuthenticated, getAdminjobs);
router.get("/trending", getTrendingJobsController);
router.get("/analytics", isAuthenticated, getJobAnalytics);
router.get("/:id", isAuthenticated, getJobById);

export default router;

