// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const SuperAdminController = require('../app/controllers/SuperAdminController');
const { validateAdminCreation } = require('../app/validators/AdminUserCreateValidator');

// POST request to create admin user
router.post('/create-admins', validateAdminCreation, SuperAdminController.createAdmin);

module.exports = router;
