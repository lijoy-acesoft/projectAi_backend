// validators/adminValidator.js

const { body } = require('express-validator');

exports.validateAdminCreation = [
    body('companyName').notEmpty().trim().escape(),
    body('companyAddress').notEmpty().trim().escape(),
    body('adminName').notEmpty().trim().escape(),
    body('phoneNumber').notEmpty().trim().isMobilePhone().escape(),
    body('email').notEmpty().trim().isEmail().normalizeEmail(),
    body('fax').optional({ nullable: true }).trim().escape(),
    body('password').notEmpty().trim(),
    body('plan').notEmpty().trim().escape()
];
