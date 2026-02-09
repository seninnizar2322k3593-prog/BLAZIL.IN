const Application = require('../models/Application');
const Job = require('../models/Job');

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (Student/Normal)
exports.applyForJob = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;
    
    // Check if resume file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a resume' });
    }
    
    // Find the job
    const job = await Job.findById(jobId);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if job is approved
    if (!job.isApproved) {
      return res.status(400).json({ message: 'This job is not approved yet' });
    }
    
    // Check if job has expired
    if (job.expiresAt && new Date(job.expiresAt) < new Date()) {
      return res.status(400).json({ message: 'This job has expired' });
    }
    
    // Check role-based restrictions
    if (req.user.role === 'normal' && job.jobType === 'part-time') {
      return res.status(403).json({ 
        message: 'Normal users can only apply for full-time and work-from-home jobs' 
      });
    }
    
    // Check if user has already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      user: req.user._id
    });
    
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }
    
    // Create application
    const application = await Application.create({
      job: jobId,
      user: req.user._id,
      resume: req.file.path,
      coverLetter
    });
    
    const populatedApplication = await Application.findById(application._id)
      .populate('job', 'title company')
      .populate('user', 'name email');
    
    res.status(201).json(populatedApplication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user's applications
// @route   GET /api/applications/user
// @access  Private
exports.getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id })
      .populate('job', 'title company location jobType salary')
      .sort({ appliedAt: -1 });
    
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get applications for a specific job
// @route   GET /api/applications/job/:jobId
// @access  Private (Client/Admin)
exports.getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    // Find the job
    const job = await Job.findById(jobId);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if user is owner or admin
    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view these applications' });
    }
    
    const applications = await Application.find({ job: jobId })
      .populate('user', 'name email role')
      .sort({ appliedAt: -1 });
    
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private (Client/Admin)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const application = await Application.findById(req.params.id).populate('job');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Check if user is job owner or admin
    if (application.job.postedBy.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this application' });
    }
    
    application.status = status;
    await application.save();
    
    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
