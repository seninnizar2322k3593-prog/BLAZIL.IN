const BusinessIdea = require('../models/BusinessIdea');

// @desc    Submit business idea
// @route   POST /api/business/contact
// @access  Public
exports.submitBusinessIdea = async (req, res) => {
  try {
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
