const express = require('express');
const router = express.Router();
const ProjectController = require('../app/controllers/ProjectController');
// const AuthController = require('../app/controllers/AuthController');

router.get('/', ProjectController.getAllProject)
router.post('/create_project', ProjectController.createProject)
router.put("/update_project/:id",ProjectController.updateProject)
router.delete("/delete/:id",ProjectController.deleteProject)

module.exports = router;
  