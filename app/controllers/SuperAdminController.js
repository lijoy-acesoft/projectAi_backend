// controllers/SuperAdminController.js

const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const AdminUser = require('../models/adminUser/adminUser');

// Controller method to create an admin user
exports.createAdmin = async (req, res) => {
    // Validate request using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Destructure fields from req.body
        const { companyName, companyAddress, adminName, phoneNumber, email, fax, password, plan } = req.body;

        // Check if admin with the same email already exists
        const existingAdmin = await AdminUser.findOne({ where: { email } });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create new admin user with hashed password
        const newAdmin = await AdminUser.create({
            companyName,
            companyAddress,
            adminName,
            phoneNumber,
            email,
            fax,
            password: hashedPassword, // Store hashed password
            plan
        });

        // Send success response
        res.status(201).json(newAdmin);
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
