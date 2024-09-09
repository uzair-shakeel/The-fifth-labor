// models/Cleaner.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewerName: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: false,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const cleanerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
  },
  experience: {
    type: Number,
    required: true,
    min: 0,
  },

  image: {
    type: String, // Store the URL of the uploaded image
    required: false,
  },
  isAvailable: {
    type: Boolean,
    default: true, // Default value to true, meaning cleaner is available for work
  },
  reviews: [reviewSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Cleaner = mongoose.model("Cleaner", cleanerSchema);

module.exports = Cleaner;
