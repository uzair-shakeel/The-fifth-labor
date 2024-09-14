const Booking = require("../models/Booking"); // Adjust the path as necessary
const User = require("../models/User"); // Adjust the path as necessary
const Service = require("../models/Service"); // Adjust the path as necessary
const sendEmail = require("../utils/sendMessage"); // Import the sendEmail function

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
      cleaner,
      hours,
      professional,
      cleaningMaterial,
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
      cleaner,
      hours,
      professional,
      cleaningMaterial,
      date,
      time,
      description,
      notes,
    });

    // Save the booking to the database
    const savedBooking = await newBooking.save();

    // Prepare email content for the admin
    const adminEmail = "uzairshakeel97531@gmail.com"; // Replace with the actual admin email
    const subject = "New Booking...";
    const emailContent = `
      <h3>New Booking Details</h3>
      <p><strong>Customer ID:</strong> ${customerId}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Services:</strong> ${services
        .map((service) => service.name)
        .join(", ")}</p>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Total:</strong> ${total}</p>
      <p><strong>Cleaner:</strong> ${cleaner}</p>
      <p><strong>Hours:</strong> ${hours}</p>
      <p><strong>Professional:</strong> ${professional ? "Yes" : "No"}</p>
      <p><strong>Cleaning Material:</strong> ${
        cleaningMaterial ? "Yes" : "No"
      }</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Notes:</strong> ${notes}</p>
    `;

    console.log("email send?");

    // Send the email to the admin
    await sendEmail(adminEmail, subject, emailContent);

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

exports.changeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { bookingId } = req.params;

    // Check if the status is one of the allowed values
    if (!["confirmed", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Find the booking by ID and update the status
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking status updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating booking status" });
  }
};

exports.submitReview = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const { serviceId, rating, comment } = req.body;
    const userId = req.user._id; // Assuming the user is authenticated and we get their ID

    // Find the booking
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if the booking belongs to the current user
    if (booking.customer.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You cannot review this booking" });
    }

    // Check if 14 days have passed since the booking date
    const currentDate = new Date();
    const bookingDate = new Date(booking.createdAt);
    const twoWeeksInMillis = 14 * 24 * 60 * 60 * 1000;

    console.log(bookingDate);
    console.log(currentDate);
    console.log(currentDate - bookingDate);
    console.log(twoWeeksInMillis);
    // if (currentDate - bookingDate < twoWeeksInMillis) {
    //   return res.status(400).json({
    //     message:
    //       "You can only review this service 2 weeks after the booking date.",
    //   });
    // }
    // Ensure the service being reviewed was part of the booking
    const bookedService = booking.services.find(
      (service) => service.id === serviceId
    );

    if (!bookedService) {
      return res
        .status(400)
        .json({ message: "This service was not booked by you." });
    }

    // Find the service in the Service model
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Add the review to the service
    const review = {
      user: userId,
      rating,
      comment,
      reviewDate: currentDate,
    };

    service.reviews.push(review);
    await service.save();

    res.status(201).json({ message: "Review submitted successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Error submitting review", error });
  }
};
