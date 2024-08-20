const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { upload } = require("../config/cloudinaryConfig");

// Route to create a new category with image upload
router.post("/", upload.single("image"), categoryController.createCategory);

// Route to update a category with a new image
router.put("/:id", upload.single("image"), categoryController.updateCategory);

// Route to get all categories
// router.get("/", categoryController.getAllCategories);
router.get("/", categoryController.getCategoriesWithServices); // Get all categories with services
router.get("/:id", categoryController.getCategoryWithServices);

// Route to get a category by ID
router.get("/:id", categoryController.getCategoryById);

// Route to delete a category by ID
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
