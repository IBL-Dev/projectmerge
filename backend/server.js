const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8070;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const URL = process.env.MONGODB_URL;

mongoose.connect(URL)
  .then(() => {
    console.log("MongoDB Connection Success!");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

  // Create upload directories if they don't exist
const createUploadDirs = () => {
  const dirs = ["uploads", "uploads/resumes", "uploads/coverletters"];
  dirs.forEach((dir) => {
    const dirPath = path.join(__dirname, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
};

createUploadDirs();

app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const studentRouter = require("./routes/students");
const consultationRouter = require("./routes/Consultation");
const usersRoute = require("./routes/usersRoute");

const router = require("./routes/ApplicantRoutes");
const jobRoutes = require("./routes/JobRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const assignmentRoutes = require("./routes/AssignmentRoutes");




const projectRoutes = require('./routes/ProjectRoute');


app.use("/student",studentRouter);
app.use("/consultation", consultationRouter);
app.use('/api/invoices', require('./Routes/invoiceRoutes'));
app.use("/api/users", usersRoute);


app.use("/applicants", router);
app.use("/jobs", jobRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/assignments", assignmentRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message,
  });
});


app.use('/projects', projectRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});