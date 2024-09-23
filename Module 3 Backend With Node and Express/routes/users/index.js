import express from "express";
import { createUser, getAllUsers, getUser } from "../../controllers/users/index.js";

const router = express.Router();

router.get("/:id", getUser);
router.get("/", getAllUsers)
router.post("/", createUser)

export default router;
