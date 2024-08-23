const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    quantity: { type: String },
    subCategory: { type: String },
    id: { type: String },
  },
  { _id: false }
); // _id: false to avoid generating an additional ObjectId for each service object in the array

const BookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  address: { type: String },
  services: [ServiceSchema], // Array of service objects
  category: { type: String }, // Details about the service
  total: { type: String, default: "AED 0.00" }, // Default value
  date: { type: Date, required: true },
  time: { type: String }, // e.g., "10:00 AM"
  description: { type: String },
  status: {
    type: String,
    enum: ["confirmed", "completed", "cancelled"],
    default: "confirmed",
  },
  notes: { type: String }, // Optional notes from the customer
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", BookingSchema);
