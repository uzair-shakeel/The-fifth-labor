const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String }, // Field to store Cloudinary image URL
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
