const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { submitBusinessIdea } = require('../controllers/businessController');

// Validation middleware
const businessIdeaValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('idea').trim().notEmpty().withMessage('Please describe your business idea')
];

router.post('/contact', businessIdeaValidation, submitBusinessIdea);

module.exports = router;
