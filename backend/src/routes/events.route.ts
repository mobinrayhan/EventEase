import { Router } from "express";
import { createNewEvent, getAllEvents } from "../controllers/events.controller";
import { isAuth } from "../middleware/isAuth";

const router = Router();

router.post("/", isAuth, createNewEvent);
router.get("/", getAllEvents);

export default router;
