import { Router } from "express";
import { createCompany, getAllCompanies, getCompanyById } from "../controllers/Company.controller";

const router = Router();

router.get("/companies", getAllCompanies);
router.get("/companies/:id", getCompanyById);
router.post("/company/create/:userId", createCompany)

export default router;