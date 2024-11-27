import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  patchUser,
  deleteUser,
  signup,
  login,
} from "../../controllers/users/index.js"; // Adjust the path based on your project structure
import { authMiddleware } from "../../middlewares/auth/index.js";

const router = express.Router();

// Create a new user
router.post("/", createUser);

// Get all users
router.get("/", authMiddleware(["Admin"]), getUsers);

// Check user role
router.get(
  "/check",
  authMiddleware(["User", "Admin", "Doctor", "Hospital"]),
  (req, res) => {
    console.log("req.user", req.user);

    // Assuming `req.user` is set by the authMiddleware after verifying the token
    return res.json({ role: req.user.role }); // Return the user's role
  }
);

// Get user by ID
router.get(
  "/:id",
  authMiddleware(["Admin", "Doctor", "User", "Hospital"]),
  getUserById
);

// Update user (PUT - full update)
router.put(
  "/:id",
  authMiddleware(["Admin", "Doctor", "User", "Hospital"]),
  updateUser
);

// Patch user (PATCH - partial update)
router.patch(
  "/:id",
  authMiddleware(["Admin", "Doctor", "User", "Hospital"]),
  patchUser
);

// Delete user
router.delete("/:id", authMiddleware(["Admin"]), deleteUser);

// Signup route
router.post("/signup", signup);
// Login route
router.post("/login", login);

export default router;
