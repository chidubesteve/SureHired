import { Router } from "express";
import {
  getUserApplications,
  getUserBookmarks,
  getFollowedCompanies,
  changePassword,
  changeUserFullName,
  getUserProfile
} from "../controllers/user.controller";

const router = Router();


router.get("/:id/applications", getUserApplications);
router.get("/:id/bookmarks", getUserBookmarks);
router.get("/:id/followed-companies", getFollowedCompanies);
router.get("/:id/profile", getUserProfile);
router.put("/change-password", changePassword);
router.patch("/change-name", changeUserFullName);

export default router;
