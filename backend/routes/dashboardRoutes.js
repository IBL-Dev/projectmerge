const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../Controllers/dashboardController");

router.get("/stats", getDashboardStats);

module.exports = router;
