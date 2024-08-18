// routes/bookingRoutes.js

const express = require("express");
const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getAllBookingsByUser,
} = require("../controllers/bookingController");

const router = express.Router();

// Define routes
router.post("/", createBooking); // Create a new booking
router.get("/", getAllBookings); // Get all bookings
router.get("/:id", getBookingById); // Get a single booking by ID
router.put("/:id", updateBooking); // Update a booking
router.delete("/:id", deleteBooking); // Delete a booking
router.get("/user/:userId", getAllBookingsByUser);

module.exports = router;
