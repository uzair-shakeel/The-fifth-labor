const Message = require("../models/Message");

// Create a new message
exports.createMessage = async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res
        .status(400)
        .json({ message: "Email and message are required" });
    }

    const newMessage = new Message({ email, message });
    const savedMessage = await newMessage.save();

    res.status(201).json({
      message: "Message created successfully",
      data: savedMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating message" });
  }
};

// Get all messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching messages" });
  }
};

// Get a single message by ID
exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching message" });
  }
};

// Update a message by ID
exports.updateMessage = async (req, res) => {
  try {
    const { email, message } = req.body;

    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      { email, message },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({
      message: "Message updated successfully",
      data: updatedMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating message" });
  }
};

// Delete a message by ID
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting message" });
  }
};
