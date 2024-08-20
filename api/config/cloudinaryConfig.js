// config/cloudinaryConfig.js
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "mern-practice",
  api_key: process.env.CLOUDINARY_API_KEY || "748289359289231",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "Qz_0OA9kSwfu0sV5DVCYet2TfHc",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "TheFifthLabour", // The folder where images will be stored in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});
const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };
