const mongoose = require('mongoose');

const businessIdeaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add your name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add your email'],
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Please add your phone number']
  },
  idea: {
    type: String,
    required: [true, 'Please describe your business idea']
  },
  status: {
    type: String,
    enum: ['pending', 'under-review', 'connected'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BusinessIdea', businessIdeaSchema);
