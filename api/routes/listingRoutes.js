import express from "express";
import { createListing } from "../controllers/listingController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/", verifyUser, createListing);

export default router;
