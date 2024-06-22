const { body, validationResult } = require('express-validator');

exports.validateProject = [
  body('project_name')
    .isString().withMessage('Project name must be a string')
    .notEmpty().withMessage('Project name is required')
    .isLength({ max: 20 }).withMessage('Project name should not exceed 20 characters'),

  body('project_type').isString().notEmpty().withMessage('Project type is required'),
  body('start_date').isISO8601().toDate().withMessage('Start date must be a valid date'),
  body('dead_line').isISO8601().toDate().withMessage('Deadline must be a valid date'),
  body('customer_name').isString().notEmpty().withMessage('Customer name is required'),
  body('comments').isString().optional(),
];
