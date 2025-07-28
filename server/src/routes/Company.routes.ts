import { Router } from "express";
import { getAllCompanies, getCompanyById } from "../controllers/Company.controller";

const router = Router();

router.get("/companies", getAllCompanies);
router.get("/companies/:id", getCompanyById);

export default router;