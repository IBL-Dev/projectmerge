const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema(
  {
    // Personal Information
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    // Professional Profiles
    linkedIn: {
      type: String,
      required: false,
    },
    portfolio: {
      type: String,
      required: false,
    },

    // Application Documents
    resume: {
      filename: String,
      path: String,
      originalName: String,
      size: Number,
      mimeType: String,
    },
    coverLetter: {
      filename: String,
      path: String,
      originalName: String,
      size: Number,
      mimeType: String,
    },
    message: {
      type: String,
      required: false,
    },

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    }, // Reference to Job
    // Application Status
    status: {
      type: String,
      enum: [
        "New",
        "In Review",
        "Shortlisted",
        "Interview",
        "Rejected",
        "On hold",
        "Hired",
      ],
      default: "New",
    },
    progress: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model("Applicant", applicantSchema);
