const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const ApplicantModel = require("../models/ApplicantModel");

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(
      __dirname,
      "..",
      file.fieldname === "resume" ? "uploads/resumes" : "uploads/coverletters"
    );
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".pdf");
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).fields([
  { name: "resume", maxCount: 1 },
  { name: "coverLetter", maxCount: 1 },
]);

// Wrap upload middleware to handle errors
const uploadMiddleware = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        message: "File upload error",
        error: err.message,
      });
    } else if (err) {
      return res.status(400).json({
        message: "Error uploading file",
        error: err.message,
      });
    }
    next();
  });
};

const {
  getAllApplicants,
  getById,
  addApplicant,
  updateApplicant,
  deleteApplicant,
} = require("../Controllers/ApplicantControllers");

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

router.get("/", getAllApplicants); // Fetch all applicants
router.get("/:id", getById); // Get a specific applicant
router.post("/", uploadMiddleware, addApplicant); // Add new applicant
router.put("/:id", updateApplicant); // Update applicant
router.delete("/:id", deleteApplicant); // Delete applicant

module.exports = router;
