const express = require("express");
const router = express.Router();
const {
  registerUserWithPhone,
  verifyPhoneNumber,
} = require("../controllers/phoneVerificationController");

// Route for user registration with phone number
router.post("/register", registerUserWithPhone);

// Route for phone number verification
router.post("/verify-phone", verifyPhoneNumber);

module.exports = router;
