// routes/bookingRoutes.js

const express = require("express");
const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getAllBookingsByUser,
  changeStatus,
} = require("../controllers/bookingController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

// Define routes
router.post("/", protect, createBooking); // Create a new booking
router.get("/", getAllBookings); // Get all bookings
router.get("/:id", getBookingById); // Get a single booking by ID
router.put("/:id", updateBooking); // Update a booking
router.delete("/:id", protect, deleteBooking); // Delete a booking
router.get("/user/:userId", protect, getAllBookingsByUser);
router.put("/booking/:bookingId", protect, changeStatus);

module.exports = router;
