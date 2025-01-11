import { Router } from "express";
import { loginUser, registrationUser } from "../controllers/auth.controller";

const router = Router();

router.post("/registration", registrationUser);
router.post("/login", loginUser);

export default router;
