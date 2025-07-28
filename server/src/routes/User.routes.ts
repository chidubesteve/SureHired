import { Router } from "express";
import { createUser, signInUser } from "../controllers/user.controller";
const router = Router();

router.post("/auth/sign-up", createUser);
router.post("/auth/sign-in", signInUser);

export default router;