const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // Automatically creates `createdAt` and `updatedAt` fields
);

module.exports = mongoose.model("Message", MessageSchema);
