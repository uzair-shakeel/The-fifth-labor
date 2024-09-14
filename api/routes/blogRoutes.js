const express = require("express");
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/BlogController");

const { upload } = require("../config/cloudinaryConfig");

const router = express.Router();

// Define routes
router.get("/", getAllBlogs); // Get all blogs
router.get("/:id", getBlogById); // Get a single blog by ID
router.post("/", upload.single("image"), createBlog); // Create a new blog with image upload
router.put("/:id", upload.single("image"), updateBlog); // Update an existing blog with image upload
router.delete("/:id", deleteBlog); // Delete a blog

module.exports = router;
