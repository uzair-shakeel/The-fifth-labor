const Booking = require("../models/Booking"); // Adjust the path as necessary
const User = require("../models/User"); // Adjust the path as necessary
const Service = require("../models/Service"); // Adjust the path as necessary

exports.createBooking = async (req, res) => {
  try {
    // Extract data from request body
    const {
      address,
      services,
      category,
      total,
      date,
      time,
      description,
      notes,
    } = req.body;

    // Get customer ID from authenticated user
    const customerId = req.user._id;

    const customerExists = await User.findById(customerId);
    if (!customerExists) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Create a new booking
    const newBooking = new Booking({
      customer: customerId,
      address,
      services, // Directly use the array of service objects
      category,
      total,
      date,
      time,
      description,
      notes,
    });

    // Save the booking to the database
    const savedBooking = await newBooking.save();

    // Return the saved booking as the response
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating booking" });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("customer");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

exports.getAllBookingsByUser = async (req, res) => {
  try {
    const userId = req.params.userId; // User ID from the route parameters
    // const userId = req.user._id;
    // Find bookings by customerId ID and populate related data

    const bookings = await Booking.find({ customer: userId }).populate(
      "customer"
    );

    console.log(bookings);

    if (!bookings.length) {
      return res
        .status(400)
        .json({ message: "No bookings found for this user" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error hi fetching bookings" });
  }
};

// Get a single booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("customer");

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
