const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const consultationSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  issueDescription: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
    enum: ["Low", "Medium", "High", "Critical"], // Ensures only valid values are accepted
  },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Finished", "Not Seen Yet"], // Valid status values
    default: "Pending", // Default status
  },
  amount: {
    type: Number,
    default: 0,
    min: [0, 'Amount cannot be negative'],
    set: v => Math.round(v * 100) / 100, // Ensure 2 decimal places
    validate: {
      validator: Number.isFinite,
      message: 'Amount must be a valid number'
    }
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

const Consultation = mongoose.model("Consultation", consultationSchema);

module.exports = Consultation;