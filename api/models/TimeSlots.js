const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema({
  timeRange: {
    type: String,
    required: true,
  },
  isPeak: {
    type: Boolean,
    default: false,
  },
  isWorkingHour: {
    type: Boolean,
    default: true,
  },
});

const TimeManagementSchema = new mongoose.Schema({
  timeSlots: [timeSlotSchema],
});

module.exports = mongoose.model("TimeManagement", TimeManagementSchema);
