// routes/userRoutes.js
const express = require("express");
const {
  registerUser,
  authUser,
  verifyUser,
  updateUser,
  getAllUsers,
  getUser,
  deleteUser,
  changeUserRole,
} = require("../controllers/userController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.post("/verify", verifyUser); // Add this line
router.put("/profile", protect, updateUser);
router.route("/").get(protect, admin, getAllUsers); // Protect route to ensure only admins can access
router.route("/me").get(protect, getUser); // Protect route to ensure only authenticated users can access
router.route("/user/:id").delete(protect, deleteUser); // Protect route to ensure only authenticated users can access
router.route("/user-role/:id").put(protect, changeUserRole); // Protect route to ensure only authenticated users can access

// router.route("/profile").put(protect, updateUser);

module.exports = router;
