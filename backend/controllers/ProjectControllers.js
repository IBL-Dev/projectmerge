const Project = require('../models//ProjectModel');
const Developer = require('../models/Developer');



// Create a new project requirement
const createProject = async (req, res) => {
  const {id, projectTitle, customerName, customerEmail, projectDescription, budget, timeline, additionalRequirements } = req.body;
  const newProject = new Project({ 
    id,
    projectTitle,
    customerName,
    customerEmail,
    projectDescription,
    budget,
    timeline,
    additionalRequirements,
  });
  
  try {
    await newProject.save();
    res.status(201).json({ message: 'Project created successfully!', project: newProject });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating project' });
  }
};

// Get all project requirements
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    console.log("Projects without populate:", projects);

    const populatedProjects = await Project.find().populate('assignedDeveloper');
    console.log("Projects with populate:", populatedProjects);

    res.status(200).json({ projects: populatedProjects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: 'Error fetching projects' });
  }
};

// Get a project by ID
const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id).populate('assignedDeveloper');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching project' });
  }
};

// Update project details (e.g., assign a developer, update status)
const updateProject = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    // Verify the project exists first
    const existingProject = await Project.findById(id);
    if (!existingProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Prevent changing certain fields if needed
    if (updateData._id) {
      delete updateData._id; // Prevent ID change
    }

    // Update the project
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      updateData,
      { 
        new: true, // Return the updated document
        runValidators: true // Run schema validators on update
      }
    );

    res.status(200).json({ 
      message: 'Project updated successfully', 
      project: updatedProject 
    });
  } catch (error) {
    console.error("Update error:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: error.errors 
      });
    }
    res.status(500).json({ 
      message: 'Error updating project',
      error: error.message 
    });
  }
};


// Delete a project
const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error deleting project' });
  }
};


//Developer asign part

const assignDeveloper = async (req, res) => {
  const { projectId, developerId } = req.body;
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { assignedDeveloper: developerId, status: 'In Progress' },
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json({ message: 'Failed to assign developer', error: err.message });
  }
};



module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  assignDeveloper,
};
