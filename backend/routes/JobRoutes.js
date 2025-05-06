const express = require("express");
const router = express.Router();
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getActiveJobs,
} = require("../Controllers/JobController");

// Job routes
router.post("/create", createJob);
router.get("/", getAllJobs);
router.get("/active", getActiveJobs);
router.get("/:id", getJobById);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

module.exports = router;
