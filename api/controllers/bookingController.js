// controllers/bookingController.js
const Booking = require("../models/Booking");
const Service = require("../models/Service");
const User = require("../models/User"); // Assuming you have a User model

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { customerId, serviceId, date, time, notes } = req.body;
    console.log(serviceId);
    console.log(customerId);
    // Validate service and customer

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const newBooking = new Booking({
      customer: customerId,
      service: serviceId,
      date,
      time,
      notes,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: "Error creating booking" });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("customer")
      .populate("service");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

exports.getAllBookingsByUser = async (req, res) => {
  try {
    const userId = req.params.userId; // User ID from the route parameters

    // Find bookings by customer ID and populate related data
    const bookings = await Booking.find({ customer: userId })
      .populate("service")
      .populate("customer");

    if (!bookings.length) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

// Get a single booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("customer")
      .populate("service");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking" });
  }
};

// Update a booking
exports.updateBooking = async (req, res) => {
  try {
    const { date, time, status, notes } = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        date,
        time,
        status,
        notes,
      },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: "Error updating booking" });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking" });
  }
};
