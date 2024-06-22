const { body, validationResult } = require('express-validator');
const { Project } = require('../models/project/Project'); // Adjust the path as necessary
const { validateProject } = require('../validators/projectValidator');

exports.getAllProject = async (req, res, next) => {
  try {
    let { page, pageSize } = req.query;
    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10;

    const { count, rows } = await Project.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: [['createdAt', 'DESC']], // Example: order by createdAt in descending order
    });

    const totalPages = Math.ceil(count / pageSize);

    res.json({
      projects: rows,
      totalPages,
      currentPage: page,
      pageSize
    });
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};


exports.createProject = [
    // Validation middleware
    validateProject,
  
    // Request handler
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        // Destructure validated input
        const { project_name, project_type, start_date, dead_line, customer_name, comments } = req.body;
  
        // Check if project_name already exists
        const existingProject = await Project.findOne({
          where: {
            project_name: project_name.trim(),
          },
        });
  
        if (existingProject) {
          return res.status(400).json({ message: 'Project with this name already exists' });
        }
  
        // Create project in the database using Sequelize
        const project = await Project.create({
          project_name,
          project_type,
          start_date,
          dead_line,
          customer_name,
          comments,
        });
  
        // Respond with success message and created project data
        res.status(201).json({ message: 'Project created successfully', project });
      } catch (err) {
        // Handle database errors or other unexpected errors
        console.error('Error creating project:', err);
        res.status(500).json({ message: 'Failed to create project' });
      }
    }
];


exports.updateProject = async (req, res, next) => {
    const projectId = req.params.id; // Get projectId from route parameters
  
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      // Extract all fields from req.body
      const updatedFields = req.body;

      if (updatedFields.project_name) {
        const existingProject = await Project.findOne({
            where: {
                project_name: updatedFields.project_name.trim(),
            },
        });
        if (existingProject) {
            return res.status(400).json({ message: 'Project with this name already exists' });
        }
    }


  
      // Update project in the database using Sequelize
      const project = await Project.findByPk(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      // Update specific fields (excluding id and handle comments separately)
      Object.keys(updatedFields).forEach(field => {
        if (field !== 'id') { // Exclude id from dynamic update
          if (field === 'comments') {
            project.comments = updatedFields.comments;
          } else {
            project[field] = updatedFields[field];
          }
        }
      });
  
      await project.save();
  
      res.json({ message: 'Project updated successfully', project });
    } catch (err) {
      console.error('Error updating project:', err);
      res.status(500).json({ message: 'Failed to update project' });
    }
};
  


exports.deleteProject = async (req, res) => {
    const projectId = req.params.id; // Get projectId from route parameters
  
    try {
      const project = await Project.findByPk(projectId);
  
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      await project.destroy();
  
      res.json({ message: 'Project deleted successfully' });
    } catch (err) {
      console.error('Error deleting project:', err);
      res.status(500).json({ message: 'Failed to delete project' });
    }
  };