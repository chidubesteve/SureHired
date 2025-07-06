import { Router } from "express";
import { getAllJobs, getFeaturedJobs } from "../controllers/JobControllers";

const router = Router();

router.get("/", getFeaturedJobs);
router.get("/jobs", getAllJobs);

export default router;