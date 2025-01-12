import { Router } from "express";
import { getAllEventsFromUser } from "../controllers/users.controller";
import { isAuth } from "../middleware/isAuth";

const router = Router();

router.get("/events", isAuth, getAllEventsFromUser);

export default router;
