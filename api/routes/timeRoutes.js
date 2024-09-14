const express = require("express");
const router = express.Router();
const timeManagementController = require("../controllers/timeController");

// Create or Update Time Slots
router.post(
  "/time-management",
  timeManagementController.createOrUpdateTimeSlots
);

router.put(
  "/time-management",
  timeManagementController.updatePeakAndWorkingHours
);

// Get Time Slots
router.get("/time-management", timeManagementController.getTimeSlots);

module.exports = router;
