const Service = require("../models/Service");
const Category = require("../models/Category");

exports.createService = async (req, res) => {
  try {
    const { name, description, price, discountedPrice, category, subCategory } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    // Validate the category ID
    const validCategory = await Category.findById(category);

    if (!validCategory) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    // Create a new service object
    const newService = new Service({
      name,
      description,
      price,
      discountedPrice,
      imageUrl,
      subCategory,
      category: validCategory._id,
    });

    const savedService = await newService.save();

    // Add the new service to the category's services array
    validCategory.services.push(savedService._id);
    await validCategory.save();

    res.status(201).json(savedService);
  } catch (error) {
    res.status(500).json({ message: "Error creating service", error });
  }
};

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
