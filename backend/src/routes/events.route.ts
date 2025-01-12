import { Router } from "express";
import {
  createNewEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateExistingEvent,
} from "../controllers/events.controller";
import { isAuth } from "../middleware/isAuth";

const router = Router();

router.post("/", isAuth, createNewEvent);
router.get("/", getAllEvents);
router.get("/:eventId", getEventById);
router.put("/:eventId", isAuth, updateExistingEvent);
router.delete("/:eventId", isAuth, deleteEvent);

export default router;
