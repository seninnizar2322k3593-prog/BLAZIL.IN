const BusinessIdea = require('../models/BusinessIdea');
const { validationResult } = require('express-validator');

// @desc    Submit business idea
// @route   POST /api/business/contact
// @access  Public
exports.submitBusinessIdea = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, idea } = req.body;
    
    const businessIdea = await BusinessIdea.create({
      name,
      email,
      phone,
      idea
    });
    
    res.status(201).json({
      message: 'Business idea submitted successfully. The admin will contact you soon.',
      businessIdea
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
