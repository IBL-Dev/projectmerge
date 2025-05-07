const Applicant = require("../models/ApplicantModel");

const addApplicant = async (req, res) => {
  try {
    console.log("Received files:", req.files);
    console.log("Received body:", req.body);

    const applicantData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      linkedIn: req.body.linkedIn || "",
      portfolio: req.body.portfolio || "",
      message: req.body.message || "",
      status: "New",
      progress: 0,
      jobId: req.body.jobId || null,
    };

    // Handle resume (required)
    if (req.files?.resume?.[0]) {
      const file = req.files.resume[0];
      applicantData.resume = {
        filename: file.filename,
        path: `/uploads/resumes/${file.filename}`, // relative path
        originalName: file.originalname,
        size: file.size,
        mimeType: file.mimetype,
      };
    } else {
      throw new Error("Resume is required");
    }

    // Handle cover letter (optional)
    if (req.files?.coverLetter?.[0]) {
      const file = req.files.coverLetter[0];
      applicantData.coverLetter = {
        filename: file.filename,
        path: `/uploads/coverletters/${file.filename}`, // relative path
        originalName: file.originalname,
        size: file.size,
        mimeType: file.mimetype,
      };
    }

    const applicant = new Applicant(applicantData);
    const savedApplicant = await applicant.save();

    res.status(201).json({
      message: "Applicant added successfully",
      applicant: savedApplicant,
    });
  } catch (err) {
    console.error("Error in addApplicant:", err);
    res.status(400).json({
      message: "Error adding applicant",
      error: err.message,
    });
  }
};

const getAllApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find()
      .populate("jobId", "title department")
      .sort({ createdAt: -1 });

    res.json({ applicants });
  } catch (error) {
    res.status(500).json({ message: "Error fetching applicants" });
  }
};

const getById = async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.id);
    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }
    res.status(200).json({ applicant });
  } catch (err) {
    console.error("Error in getById:", err);
    res.status(500).json({
      message: "Error fetching applicant",
      error: err.message,
    });
  }
};

const updateApplicant = async (req, res) => {
  try {
    const applicant = await Applicant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }
    res.status(200).json({ applicant });
  } catch (err) {
    console.error("Error in updateApplicant:", err);
    res.status(400).json({
      message: "Error updating applicant",
      error: err.message,
    });
  }
};

const deleteApplicant = async (req, res) => {
  try {
    const applicant = await Applicant.findByIdAndDelete(req.params.id);
    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }
    res.status(200).json({ message: "Applicant deleted successfully" });
  } catch (err) {
    console.error("Error in deleteApplicant:", err);
    res.status(500).json({
      message: "Error deleting applicant",
      error: err.message,
    });
  }
};

module.exports = {
  addApplicant,
  getAllApplicants,
  getById,
  updateApplicant,
  deleteApplicant,
};
