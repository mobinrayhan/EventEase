import { Router } from "express";
import { check } from "express-validator";
import { loginUser, registrationUser } from "../controllers/auth.controller";

const router = Router();

router.post(
  "/registration",
  [
    check("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 1 })
      .withMessage("Name cannot be empty"),

    check("email")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .normalizeEmail(),

    check("password")
      .isLength({ min: 6, max: 32 })
      .withMessage("Password must be between 6 and 32 characters long"),
  ],
  registrationUser
);
router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .normalizeEmail(),

    check("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  loginUser
);

export default router;
