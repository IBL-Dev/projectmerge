const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/ProjectControllers');

// Routes for project CRUD operations
router.post('/', ProjectController.createProject); // Create project
router.get('/', ProjectController.getAllProjects); // Get all projects
router.get('/:id', ProjectController.getProjectById); // Get a project by ID
router.put('/:id', ProjectController.updateProject); // Update project
router.delete('/:id', ProjectController.deleteProject); // Delete project
router.put('/assign', ProjectController.assignDeveloper);//developer asign
module.exports = router;


