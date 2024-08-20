const Category = require("../models/Category");

// Create a new category with image upload
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Handle image upload

    const newCategory = new Category({
      name,
      description,
      imageUrl, // Save the imageUrl to the category
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

// Update a category with a new image
exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const imageUrl = req.file ? req.file.path : req.body.imageUrl; // Update image if a new one is uploaded

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description, imageUrl },
      { new: true } // Return the updated document
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error });
  }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};

exports.getCategoryWithServices = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "services"
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching category with services", error });
  }
};
exports.getCategoriesWithServices = async (req, res) => {
  try {
    const categories = await Category.find().populate({
      path: "services", // Field in Category schema
      populate: {
        path: "category", // Nested population if needed (not necessary here)
        model: "Category", // The model to populate (if needed)
      },
    });
    // const categories = await Category.find().populate("services");

    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching categories with services", error });
  }
};
