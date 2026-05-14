import { Router } from "express";
import { createCompany, getAllCompanies, getCompanyById, updateCompany } from "../controllers/Company.controller";
import { uploadLogo } from "../middleware/uploadLogo";

const router = Router();

router.get("/companies", getAllCompanies);
router.get("/companies/:id", getCompanyById);
router.post("/company/create/:userId", uploadLogo.single("logo"), createCompany)
router.put(
  "/company/update/:companyId",
  uploadLogo.single("logo"),
  updateCompany
);

export default router;