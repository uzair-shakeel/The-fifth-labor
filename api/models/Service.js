// models/Service.js
const mongoose = require("mongoose");

const SubserviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
});

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  imageUrl: { type: String },
  subservices: [SubserviceSchema], // Array of subservice objects
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Service", ServiceSchema);
