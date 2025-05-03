const express = require("express");
const router = express.Router();
const consultationController = require("../controllers/consultationController");

// Add a new consultation
router.post("/add", consultationController.addConsultation);

// Get all consultations
router.get("/", consultationController.getAllConsultations);

// Update consultation details
router.put("/update/:id", consultationController.updateConsultation);

// Delete a consultation by ID
router.delete("/delete/:id", consultationController.deleteConsultation);

// Get a single consultation by ID
router.get("/get/:id", consultationController.getConsultationById);

module.exports = router;
