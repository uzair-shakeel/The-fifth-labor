// routes/cleanersRoutes.js
const express = require("express");
const cleanersController = require("../controllers/CleanerController");
const { upload } = require("../config/cloudinaryConfig");

const router = express.Router();

// Define routes
router.post("/", upload.single("image"), cleanersController.createCleaner); // Create a new cleaner with image upload
router.get("/:id", cleanersController.getCleaner); // Get a single cleaner by ID
router.get("/", cleanersController.getAllCleaners); // Get all cleaners
router.put("/:id", upload.single("image"), cleanersController.updateCleaner); // Update a cleaner by ID with image upload
router.delete("/:id", cleanersController.deleteCleaner); // Delete a cleaner by ID
router.post("/:id/reviews", cleanersController.addReview); // Add a review to a cleaner

module.exports = router;
