const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  projectTitle: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
    min: 0,
  },
  timeline: {
    type: String,
    required: true,
  },
  additionalRequirements: {
    type: String,
    default: '',
  },
  assignedDeveloper: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Developer', // Assumed you have a Developer model
    default: null,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
