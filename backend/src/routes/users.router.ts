import { Router } from "express";
import {
  getAllEventsFromUser,
  registerForEvents,
} from "../controllers/users.controller";
import { isAuth } from "../middleware/isAuth";

const router = Router();

router.get("/events", isAuth, getAllEventsFromUser);
router.post("/event-registration", isAuth, registerForEvents);

export default router;
