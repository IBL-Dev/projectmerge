const Job = require("../models/JobModel");

// Create a new job
const createJob = async (req, res) => {
  try {
    console.log("Received job data:", req.body); // For debugging

    // Validate required fields
    if (!req.body.title || !req.body.description || !req.body.location) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Create new job directly from form data since structures match
    const newJob = new Job(req.body);

    // Save the job
    const savedJob = await newJob.save();

    res.status(201).json({
      success: true,
      job: savedJob,
      message: "Job created successfully",
    });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({
      success: false,
      message: "Error creating job",
      error: error.message,
    });
  }
};

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching jobs",
      error: error.message,
    });
  }
};

// Get a single job
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching job",
      error: error.message,
    });
  }
};

// Update job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({
      message: "Job updated successfully",
      job,
    });
  } catch (err) {
    console.error("Error in updateJob:", err);
    res.status(400).json({
      message: "Error updating job",
      error: err.message,
    });
  }
};

// Delete job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (err) {
    console.error("Error in deleteJob:", err);
    res.status(500).json({
      message: "Error deleting job",
      error: err.message,
    });
  }
};

// Get active jobs
const getActiveJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "active" }).sort({ createdAt: -1 });
    res.status(200).json({ jobs });
  } catch (err) {
    console.error("Error in getActiveJobs:", err);
    res.status(500).json({
      message: "Error fetching active jobs",
      error: err.message,
    });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getActiveJobs,
};
