const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountedPrice: { type: Number },
  imageUrl: { type: String },
  subCategory: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Reference to Category schema
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Service", ServiceSchema);
