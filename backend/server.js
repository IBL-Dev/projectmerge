const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

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

const studentRouter = require("./routes/students");
const consultationRouter = require("./routes/Consultation");
const usersRoute = require("./routes/usersRoute");
const projectRoutes = require('./routes/ProjectRoute');

app.use("/student",studentRouter);
app.use("/consultation", consultationRouter);
app.use('/api/invoices', require('./Routes/invoiceRoutes'));
app.use("/api/users", usersRoute);
app.use('/projects', projectRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});