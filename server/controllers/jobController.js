const Job = require('../models/Job');
const { validationResult } = require('express-validator');

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
exports.getAllJobs = async (req, res) => {
  try {
    const { jobType, state, search } = req.query;
    
    // Build filter object
    let filter = { 
      isApproved: true
    };
    
    // Start with expiry filter
    const expiryCondition = {
      $or: [
        { expiresAt: { $gt: new Date() } },
        { expiresAt: null }
      ]
    };
    
    if (jobType) {
      filter.jobType = jobType;
    }
    
    if (state) {
      filter.state = state;
    }
    
    // Properly combine search with expiry condition
    if (search) {
      filter.$and = [
        expiryCondition,
        {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { company: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
          ]
        }
      ];
    } else {
      // If no search, just add expiry condition directly
      filter.$or = expiryCondition.$or;
    }
    
    const jobs = await Job.find(filter)
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name email');
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create job
// @route   POST /api/jobs
// @access  Private (Client)
exports.createJob = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, company, location, state, jobType, salary } = req.body;
    
    const job = await Job.create({
      title,
      description,
      company,
      location,
      state,
      jobType,
      salary,
      postedBy: req.user._id
    });
    
    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Client/Admin)
exports.updateJob = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if user is owner or admin
    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }
    
    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Client/Admin)
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if user is owner or admin
    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }
    
    await job.deleteOne();
    
    res.json({ message: 'Job removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user's posted jobs
// @route   GET /api/jobs/my-jobs
// @access  Private (Client)
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).sort({ createdAt: -1 });
    
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
