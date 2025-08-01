import { Router } from "express";
import { createUser, signInUser } from "../controllers/Auth.controller";

const router = Router();


router.post("/sign-up", createUser);
router.post("/sign-in", signInUser);

export default router;