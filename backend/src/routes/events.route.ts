import { Router } from "express";
import {
  createNewEvent,
  getAllEvents,
  getEventById,
} from "../controllers/events.controller";
import { isAuth } from "../middleware/isAuth";

const router = Router();

router.post("/", isAuth, createNewEvent);
router.get("/", getAllEvents);
router.get("/:eventId", getEventById);

export default router;
