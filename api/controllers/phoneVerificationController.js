const User = require("../models/User");

// Generate a new verification code for phone verification
const generateVerificationCode = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// Send SMS using Firebase Admin SDK
const sendSMS = async (phoneNumber, verificationCode) => {
  try {
    // Replace with your own implementation to send SMS
    // You can use Firebase Admin SDK or another SMS provider
    console.log(`Sending SMS to ${phoneNumber} with code ${verificationCode}`);
    // Example: Use Firebase Admin SDK to send SMS
    // await admin.messaging().send({...});
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw new Error("Error sending SMS");
  }
};

exports.registerUserWithPhone = async (req, res) => {
  const { email, phoneNumber } = req.body;
  console.log("object");
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User Doesn't exist exists" });
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();

    // Send the verification SMS
    // await sendSMS(phoneNumber, verificationCode);

    try {
      const response = await sendSMS(phoneNumber, verificationCode); // Your SMS sending logic
      console.log("SMS sent successfully", response);
    } catch (error) {
      console.error("Error sending SMS:", error);
    }

    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.verifyPhoneNumber = async (req, res) => {
  const { phoneNumber, verificationCode } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified" });
    }

    if (user.verificationCode !== verificationCode) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    // Update the user's verified status
    user.isVerified = true;
    user.verificationCode = undefined; // Optionally, remove the verification code
    await user.save();

    res.status(200).json({ message: "Phone number verified successfully" });
  } catch (error) {
    console.error("Error in phone verification:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
