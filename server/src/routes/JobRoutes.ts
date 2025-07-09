import { Router } from "express";
import { getAllJobs, getFeaturedJobs, getJobById } from "../controllers/JobControllers";

const router = Router();

router.get("/", getFeaturedJobs);
router.get("/jobs", getAllJobs);
router.get("/jobs/:id", getJobById);

export default router;