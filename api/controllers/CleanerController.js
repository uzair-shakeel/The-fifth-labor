// controllers/cleanersController.js
const Cleaner = require("../models/Cleaner");

// Create a new cleaner
exports.createCleaner = async (req, res) => {
  try {
    const { name, age, experience, isAvailable } = req.body;
    let image = null;

    // Check if an image is uploaded
    if (req.file) {
      image = req.file.path; // Cloudinary returns the image URL in the path
    }

    const cleaner = new Cleaner({
      name,
      age,
      experience,
      isAvailable,
      image,
    });

    await cleaner.save();
    res.status(201).json(cleaner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single cleaner by ID
exports.getCleaner = async (req, res) => {
  try {
    const cleaner = await Cleaner.findById(req.params.id);
    if (!cleaner) {
      return res.status(404).json({ message: "Cleaner not found" });
    }
    res.json(cleaner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all cleaners
exports.getAllCleaners = async (req, res) => {
  try {
    const cleaners = await Cleaner.find().sort({ createdAt: -1 });
    res.json(cleaners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAvailableCleaners = async (req, res) => {
  try {
    const availableCleaners = await Cleaner.find({
      isAvailable: { $ne: false },
    }).sort({ createdAt: -1 });
    console.log("Available Cleaners:", availableCleaners); // Log to debug
    res.status(200).json(availableCleaners);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching available cleaners", error });
  }
};

// Fetch non-available cleaners
exports.getNonAvailableCleaners = async (req, res) => {
  try {
    const nonAvailableCleaners = await Cleaner.find({
      isAvailable: false,
    }).sort({ createdAt: -1 });
    res.status(200).json(nonAvailableCleaners);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching non-available cleaners", error });
  }
};

// Update a cleaner by ID
exports.updateCleaner = async (req, res) => {
  try {
    const { name, age, experience, isAvailable } = req.body;
    let image = req.body.image; // Keep the existing image by default

    // Check if a new image is uploaded
    if (req.file) {
      image = req.file.path; // Cloudinary returns the image URL in the path
    }

    const cleaner = await Cleaner.findByIdAndUpdate(
      req.params.id,
      { name, age, experience, image, isAvailable },
      { new: true, runValidators: true }
    );

    if (!cleaner) {
      return res.status(404).json({ message: "Cleaner not found" });
    }

    res.json(cleaner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a cleaner by ID
exports.deleteCleaner = async (req, res) => {
  try {
    const cleaner = await Cleaner.findByIdAndDelete(req.params.id);
    if (!cleaner) {
      return res.status(404).json({ message: "Cleaner not found" });
    }
    res.json({ message: "Cleaner deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a review to a cleaner
exports.addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = req.body;
    const cleaner = await Cleaner.findById(id);

    if (!cleaner) {
      return res.status(404).json({ message: "Cleaner not found" });
    }

    cleaner.reviews.push(review);
    await cleaner.save();

    res.status(201).json(cleaner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
