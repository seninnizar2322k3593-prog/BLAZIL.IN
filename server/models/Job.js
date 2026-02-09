const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a job title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a job description']
  },
  company: {
    type: String,
    required: [true, 'Please add a company name'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  state: {
    type: String,
    required: [true, 'Please add a state'],
    enum: ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana']
  },
  jobType: {
    type: String,
    required: [true, 'Please specify job type'],
    enum: ['part-time', 'full-time', 'work-from-home']
  },
  salary: {
    type: String,
    required: [true, 'Please add salary information']
  },
  requirements: {
    type: [String],
    default: []
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-set expiry for part-time jobs
jobSchema.pre('save', function(next) {
  if (this.jobType === 'part-time' && !this.expiresAt) {
    this.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  }
  next();
});

module.exports = mongoose.model('Job', jobSchema);
