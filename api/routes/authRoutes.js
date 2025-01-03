import express from "express";
import {
  google,
  signin,
  signOut,
  signup,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.post("/signout", signOut);

export default router;
