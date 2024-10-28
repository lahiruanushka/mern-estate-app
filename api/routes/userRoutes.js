import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { deleteUser, updateUser, getUser } from "../controllers/userController.js";

const router = express.Router();

router.put("/:id", verifyUser, updateUser);
router.delete("/:id",verifyUser, deleteUser )
router.get('/:id', verifyUser, getUser)

export default router;
