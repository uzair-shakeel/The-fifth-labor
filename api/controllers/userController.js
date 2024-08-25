const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendVerification");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate verification code
    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
    console.log(verificationCode);

    // Create the user with verification code
    const user = await User.create({
      name,
      email,
      password,
      verificationCode,
      isVerified: false,
    });

    // Send the verification email
    await sendEmail(user.email, "Please verify your email", verificationCode);

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Please Register first" });
    }

    if (await user.matchPassword(password)) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error in user authentication:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

exports.verifyUser = async (req, res) => {
  const { email, verificationCode } = req.body;
  console.log(email);
  console.log(verificationCode);
  try {
    const user = await User.findOne({ email });
    console.log(user);

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
    console.log(user);

    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.error("Error in user verification:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.user.id;
  const {
    name,
    email,
    password,
    addresses, // Expecting an array of address objects
    dateOfBirth,
    gender,
  } = req.body;

  console.log(req.body);

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only the fields that are provided in the request
    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    if (addresses) {
      // Update addresses array
      user.addresses = addresses;
    }

    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.gender = gender || user.gender;

    await user.save();

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      addresses: user.addresses,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      isVerified: user.isVerified,
      role: user.role,
    });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.getUser = async (req, res) => {
  const userId = req.user.id; // Assuming user ID is available in req.user

  try {
    // Find user by ID and exclude password field
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      addresses: user.addresses,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      isVerified: user.isVerified,
      role: user.role,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // Find all users
    const users = await User.find().select("-password"); // Exclude password from response

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.deleteUser = async (req, res) => {
  // const userId = req.user.id; // Assuming user ID is available in req.user
  const userId = req.params.id; // Assuming user ID is available in req.user

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.changeUserRole = async (req, res) => {
  const { id } = req.params; // Get userId from URL parameters
  const { role } = req.body; // Get the new role from the request body
  console.log(id);

  try {
    // Ensure that the role is either "user" or "admin"
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    console.log("object");

    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user);
    // Update the user's role
    user.role = role;
    console.log(user.role);
    await user.save();

    res.status(200).json({
      message: `User role updated to ${role}`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is already verified
    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified" });
    }

    // Generate a new verification code
    const newVerificationCode = Math.floor(
      1000 + Math.random() * 9000
    ).toString();
    user.verificationCode = newVerificationCode;

    // Save the updated user with the new verification code
    await user.save();

    // Send the verification email
    await sendEmail(
      user.email,
      "Resend: Please verify your email",
      newVerificationCode
    );

    res.status(200).json({ message: "Verification email resent successfully" });
  } catch (error) {
    console.error("Error resending verification email:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
