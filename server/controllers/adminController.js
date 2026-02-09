const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');
const BusinessIdea = require('../models/BusinessIdea');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all jobs (including unapproved)
// @route   GET /api/admin/jobs
// @access  Private (Admin)
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Approve job
// @route   PUT /api/admin/jobs/:id/approve
// @access  Private (Admin)
exports.approveJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    job.isApproved = true;
    await job.save();
    
    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete job
// @route   DELETE /api/admin/jobs/:id
// @access  Private (Admin)
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    await job.deleteOne();
    
    res.json({ message: 'Job removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all applications
// @route   GET /api/admin/applications
// @access  Private (Admin)
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('job', 'title company')
      .populate('user', 'name email role')
      .sort({ appliedAt: -1 });
    
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private (Admin)
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();
    const pendingJobs = await Job.countDocuments({ isApproved: false });
    const activeJobs = await Job.countDocuments({ 
      isApproved: true,
      $or: [
        { expiresAt: { $gt: new Date() } },
        { expiresAt: null }
      ]
    });
    
    res.json({
      totalUsers,
      totalJobs,
      totalApplications,
      pendingJobs,
      activeJobs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all business ideas
// @route   GET /api/admin/business-ideas
// @access  Private (Admin)
exports.getAllBusinessIdeas = async (req, res) => {
  try {
    const businessIdeas = await BusinessIdea.find().sort({ submittedAt: -1 });
    res.json(businessIdeas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update business idea status
// @route   PUT /api/admin/business-ideas/:id
// @access  Private (Admin)
exports.updateBusinessIdeaStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const businessIdea = await BusinessIdea.findById(req.params.id);
    
    if (!businessIdea) {
      return res.status(404).json({ message: 'Business idea not found' });
    }
    
    businessIdea.status = status;
    await businessIdea.save();
    
    res.json(businessIdea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
