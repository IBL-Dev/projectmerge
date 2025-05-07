const Applicant = require("../models/ApplicantModel");
const Job = require("../models/JobModel");
//const Assignment = require("../models/AssignmentModel");

const getDashboardStats = async (req, res) => {
  try {
    const totalApplicants = await Applicant.countDocuments();
    const activeJobs = await Job.countDocuments({ isActive: true });
    const pendingApplications = await Applicant.countDocuments({
      status: "Pending",
    });
    /*const completedAssignments = await Assignment.countDocuments({
      status: "Completed",
    });*/

    res.status(200).json({
      totalApplicants,
      activeJobs,
      pendingApplications,
      completedAssignments,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard stats", error });
  }
};

module.exports = { getDashboardStats };
