import { Router } from "express";
import { createNewEvent } from "../controllers/events.controller";
import { isAuth } from "../middleware/isAuth";

const router = Router();

router.post("/", isAuth, createNewEvent);
export default router;
