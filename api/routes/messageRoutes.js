const express = require("express");
const router = express.Router();
const {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
} = require("../controllers/MessageController");

// Create a new message
router.post("/", createMessage);

// Get all messages
router.get("/", getAllMessages);

// Get a single message by ID
router.get("/:id", getMessageById);

// Update a message by ID
router.put("/:id", updateMessage);

// Delete a message by ID
router.delete("/:id", deleteMessage);

module.exports = router;
