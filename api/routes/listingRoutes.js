import express from "express";
import {
  createListing,
  deleteListing,
  getSingleListing,
  getUserListings,
  updateListing,
  getListings,
} from "../controllers/listingController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/", verifyUser, createListing);
router.get("/user/:userId", verifyUser, getUserListings);
router.put("/:listingId", verifyUser, updateListing);
router.delete("/:listingId", verifyUser, deleteListing);
router.get("/:listingId", getSingleListing);
router.get("/", getListings);

export default router;
