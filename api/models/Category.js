const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }], // Array of service references
});

module.exports = mongoose.model("Category", CategorySchema);
