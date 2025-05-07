const mongoose = require("mongoose");
const Applicant = require("./models/ApplicantModel");

mongoose
  .connect(
    "mongodb+srv://Oshadi:2003@skilllab.1uody.mongodb.net/applicant_tracking_system"
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const testApplicants = [
  {
    name: "John Smith",
    email: "john.smith@email.com",
    resumePath: "https://example.com/resume1.pdf",
    jobTitle: "Frontend Developer",
    status: "shortlisted",
    progress: 75,
    reviewNotes: "Strong React skills, good portfolio",
  },
  {
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    resumePath: "https://example.com/resume2.pdf",
    jobTitle: "UI/UX Designer",
    status: "reviewing",
    progress: 50,
    reviewNotes: "Excellent design portfolio",
  },
  {
    name: "Michael Chen",
    email: "m.chen@email.com",
    resumePath: "https://example.com/resume3.pdf",
    jobTitle: "Backend Developer",
    status: "assignment_sent",
    progress: 25,
    reviewNotes: "Strong Node.js background",
  },
  {
    name: "Emma Wilson",
    email: "emma.w@email.com",
    resumePath: "https://example.com/resume4.pdf",
    jobTitle: "Full Stack Developer",
    status: "pending",
    progress: 0,
    reviewNotes: "",
  },
  {
    name: "David Kumar",
    email: "david.k@email.com",
    resumePath: "https://example.com/resume5.pdf",
    jobTitle: "DevOps Engineer",
    status: "rejected",
    progress: 100,
    reviewNotes: "Not enough experience with AWS",
  },
];

const addTestData = async () => {
  try {
    // Clear existing data
    await Applicant.deleteMany({});
    console.log("Cleared existing data");

    // Add new test data
    const result = await Applicant.insertMany(testApplicants);
    console.log(`Added ${result.length} test applicants`);

    // Log the added applicants
    console.log("Added applicants:", result);
  } catch (error) {
    console.error("Error adding test data:", error);
  } finally {
    mongoose.connection.close();
  }
};

addTestData();
