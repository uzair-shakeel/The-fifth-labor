// controllers/serviceController.js

const Service = require("../models/Service");

// Function to get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services" });
  }
};

// Function to get a single service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Error fetching service" });
  }
};

// Create a new service with subservices and image upload
// controllers/serviceController.js

exports.createService = async (req, res) => {
  try {
    console.log("runnnig");
    const { name, description, price, duration, subservices } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    // Create a new service object with required fields
    const newService = new Service({
      name,
      description,
      price,
      duration,
      imageUrl,
      // Include subservices only if provided
      ...(subservices && { subservices: JSON.parse(subservices) }),
    });

    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(500).json({ message: "Error creating service" });
  }
};

// Update an existing service with new subservices and image upload
exports.updateService = async (req, res) => {

  try {
    const { name, description, price, duration, subservices } = req.body;
    let updatedData = { name, description, price, duration };

    if (req.file) {
      console.log("File received:", req.file); // Log file details
      updatedData.imageUrl = req.file.path; // Save the image path
    }

    if (subservices) {
      console.log("Subservices received:", subservices); // Log subservices
      updatedData.subservices = JSON.parse(subservices); // Convert JSON string to object
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    console.error("Server error:", error); // Log server errors
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Function to delete a service
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting service" });
  }
};
