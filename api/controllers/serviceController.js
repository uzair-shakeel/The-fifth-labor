const Service = require("../models/Service");
const Category = require("../models/Category");

exports.createService = async (req, res) => {
  try {
    const { name, description, price, discountedPrice, category, subCategory } =
      req.body;
    const imageUrl = req.file ? req.file.path : null;

    // Validate the category ID
    const validCategory = await Category.findById(category);

    if (!validCategory) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    // Create a new service object with optional price field
    const newServiceData = {
      name,
      description,
      discountedPrice,
      imageUrl,
      subCategory,
      category: validCategory._id,
    };

    if (price !== undefined) {
      newServiceData.price = price;
    }

    const newService = new Service(newServiceData);
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
    const { name, description, price, discountedPrice, category, subCategory } =
      req.body;

    let updatedData = {
      name,
      description,
      price,
      discountedPrice,
      subCategory,
    };

    // Validate the category ID
    if (category) {
      const validCategory = await Category.findById(category);

      if (!validCategory) {
        return res.status(400).json({ message: "Invalid category ID" });
      }

      updatedData.category = validCategory._id;
    }

    // Handle image upload
    if (req.file) {
      console.log("File received:", req.file); // Log file details
      updatedData.imageUrl = req.file.path; // Save the image path
    }

    // Update the service
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    // If the category has been updated, also update the category's services list
    if (category) {
      const previousCategory = await Category.findById(updatedService.category);
      if (previousCategory) {
        previousCategory.services = previousCategory.services.filter(
          (serviceId) => serviceId.toString() !== updatedService._id.toString()
        );
        await previousCategory.save();
      }

      const newCategory = await Category.findById(category);
      if (newCategory) {
        newCategory.services.push(updatedService._id);
        await newCategory.save();
      }
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
