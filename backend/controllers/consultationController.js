const Consultation = require("../models/Consultation");

// Add a new consultation
exports.addConsultation = (req, res) => {
  const {
    fullName,
    email,
    phone,
    dateTime,
    projectName,
    projectDescription,
    issueDescription,
    priority,
    status,
    amount
  } = req.body;

  const newConsultation = new Consultation({
    fullName,
    email,
    phone,
    dateTime,
    projectName,
    projectDescription,
    issueDescription,
    priority,
    status: status || "Pending", // Default status
    amount: amount || 0 // Default amount
  });

  newConsultation.save()
    .then((savedConsultation) => {
      res.status(201).json({
        status: "Consultation added successfully",
        consultation: savedConsultation // This includes the _id
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ 
        status: "Error adding consultation", 
        error: err.message 
      });
    });
};

// Get all consultations
exports.getAllConsultations = (req, res) => {
  Consultation.find()
    .then((consultations) => {
      res.json(consultations);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error fetching consultations", error: err.message });
    });
};

// Update consultation details
exports.updateConsultation = async (req, res) => {
  try {
    const consultationId = req.params.id;
    
    // Only update the fields that are actually provided
    const updateData = {};
    
    // List of possible fields that can be updated
    const updatableFields = [
      'fullName', 'email', 'phone', 'dateTime', 
      'projectName', 'projectDescription', 'issueDescription',
      'priority', 'status', 'amount'
    ];
    
    // Only add fields that exist in the request body
    updatableFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });
    
    // Special handling for amount to ensure it's a number
    if (updateData.amount !== undefined) {
      updateData.amount = Number(updateData.amount);
      if (isNaN(updateData.amount) || updateData.amount < 0) {
        return res.status(400).send({ 
          status: "Error", 
          error: "Amount must be a positive number" 
        });
      }
    }
    
    const updatedConsultation = await Consultation.findByIdAndUpdate(
      consultationId,
      { $set: updateData }, // Using $set for proper partial updates
      { 
        new: true, // Return the updated document
        runValidators: true // Run schema validations
      }
    );
    
    if (!updatedConsultation) {
      return res.status(404).send({ status: "Consultation not found" });
    }
    
    res.status(200).send({ 
      status: "Consultation updated", 
      consultation: updatedConsultation 
    });
    
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).send({ 
      status: "Error updating consultation", 
      error: err.message,
      details: err.errors // Include validation errors if any
    });
  }
};

// Delete a consultation by ID
exports.deleteConsultation = async (req, res) => {
  let consultationId = req.params.id;
  try {
    await Consultation.findByIdAndDelete(consultationId);
    res.status(200).send({ status: "Consultation deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ 
      status: "Error deleting consultation", 
      error: err.message 
    });
  }
};

// Get a single consultation by ID
exports.getConsultationById = async (req, res) => {
  let consultationId = req.params.id;
  try {
    const consultation = await Consultation.findById(consultationId);

    if (!consultation) {
      return res.status(404).send({ status: "Consultation not found" });
    }

    res.status(200).send({
      status: "Consultation fetched",
      consultation: consultation,  // Will include amount if it exists
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      status: "Error fetching consultation",
      error: err.message,
    });
  }
};
