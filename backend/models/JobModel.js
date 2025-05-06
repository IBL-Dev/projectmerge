const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [
      {
        type: String,
        required: true,
      },
    ],
    responsibilities: [
      {
        type: String,
        required: true,
      },
    ],
    jobType: {
      type: String,
      required: true,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: "LKR",
      },
    },
    experience: {
      min: Number,
      max: Number,
      unit: {
        type: String,
        default: "years",
      },
    },
    status: {
      type: String,
      enum: ["active", "closed", "draft"],
      default: "active",
    },
    deadline: {
      type: Date,
      required: true,
    },
    postedBy: {
      type: String,
      default: "TalentPool",
    },
    department: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
