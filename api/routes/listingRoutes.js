import express from "express";
import {
  createListing,
  getUserListings,
} from "../controllers/listingController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/", verifyUser, createListing);
router.get("/user/:userId", verifyUser, getUserListings);

export default router;
