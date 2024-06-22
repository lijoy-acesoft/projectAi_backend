const express = require('express');
const router = express.Router();
const TaskController = require('../app/controllers/TaskController');
// const AuthController = require('../app/controllers/AuthController');

router.get('/', TaskController.getAllTasks)
// router.post('/create_project', ProjectController.createProject)
// router.put("/update_project/:id",ProjectController.updateProject)
// router.delete("/delete/:id",ProjectController.deleteProject)

module.exports = router;
 