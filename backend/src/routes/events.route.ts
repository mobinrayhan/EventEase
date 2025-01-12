import { Router } from "express";
import {
  createNewEvent,
  getAllEvents,
  getEventById,
  updateExistingEvent,
} from "../controllers/events.controller";
import { isAuth } from "../middleware/isAuth";

const router = Router();

router.post("/", isAuth, createNewEvent);
router.get("/", getAllEvents);
router.get("/:eventId", getEventById);
router.put("/:eventId", updateExistingEvent);

export default router;
