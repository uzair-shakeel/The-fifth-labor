// routes/serviceRoutes.js

const express = require("express");
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getAllReviewsFromAllServices,
} = require("../controllers/serviceController");

const { upload } = require("../config/cloudinaryConfig");

const router = express.Router();

// Define routes
router.get("/", getAllServices); // Get all services
router.get("/:id", getServiceById); // Get a single service by ID
router.post("/", upload.single("image"), createService); // Create a new service with image upload
router.put("/:id", upload.single("image"), updateService); // Update an existing service with image upload
router.delete("/:id", deleteService); // Delete a service
router.get("/reviews/all", getAllReviewsFromAllServices);

module.exports = router;
