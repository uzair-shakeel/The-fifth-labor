const TimeManagement = require("../models/TimeSlots");

// Helper function to generate 24-hour time slots (30-minute intervals)
const generate24HourTimeSlots = () => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    const hourStr = hour.toString().padStart(2, "0");
    slots.push({
      timeRange: `${hourStr}:00-${hourStr}:30`,
      isPeak: false,
      isWorkingHour: false,
    });
    slots.push({
      timeRange: `${hourStr}:30-${(hour + 1).toString().padStart(2, "0")}:00`,
      isPeak: false,
      isWorkingHour: false,
    });
  }
  return slots;
};

// Create or Update Time Slots
exports.createOrUpdateTimeSlots = async (req, res) => {
  const { timeSlots } = req.body;

  try {
    let timeManagement = await TimeManagement.findOne();

    if (timeManagement) {
      // Update existing time slots
      timeManagement.timeSlots = timeSlots;
      await timeManagement.save();
      return res
        .status(200)
        .json({ message: "Time slots updated successfully", timeManagement });
    } else {
      // Create time slots if not found
      const generatedSlots = generate24HourTimeSlots(); // Pre-generate slots
      timeManagement = new TimeManagement({ timeSlots: generatedSlots });

      await timeManagement.save();
      return res
        .status(201)
        .json({ message: "Time slots created successfully", timeManagement });
    }
  } catch (error) {
    console.error("Error creating or updating time slots:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get Time Slots
exports.getTimeSlots = async (req, res) => {
  try {
    const timeManagement = await TimeManagement.findOne();

    if (!timeManagement) {
      // If no time slots exist, generate default slots and return them
      const generatedSlots = generate24HourTimeSlots();
      return res.status(200).json({
        message: "Default time slots generated",
        timeSlots: generatedSlots,
      });
    }

    return res.status(200).json(timeManagement);
  } catch (error) {
    console.error("Error fetching time slots:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


// Update isPeak and isWorkingHour for specific time slots
exports.updatePeakAndWorkingHours = async (req, res) => {
  const { updatedSlots } = req.body;

  try {
    let timeManagement = await TimeManagement.findOne();

    if (!timeManagement) {
      return res.status(404).json({ message: "Time slots not found" });
    }

    // Update specific time slots
    updatedSlots.forEach((updatedSlot) => {
      const slot = timeManagement.timeSlots.find(
        (slot) => slot.timeRange === updatedSlot.timeRange
      );

      if (slot) {
        // Only update the fields sent in the request
        if (typeof updatedSlot.isPeak !== "undefined") {
          slot.isPeak = updatedSlot.isPeak;
        }
        if (typeof updatedSlot.isWorkingHour !== "undefined") {
          slot.isWorkingHour = updatedSlot.isWorkingHour;
        }
      }
    });

    await timeManagement.save();
    return res
      .status(200)
      .json({ message: "Time slots updated successfully", timeManagement });
  } catch (error) {
    console.error("Error updating peak and working hours:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
