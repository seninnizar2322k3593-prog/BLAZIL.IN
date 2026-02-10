const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getMyJobs
} = require('../controllers/jobController');
const { protect, verified, authorize } = require('../middleware/auth');

// Validation middleware
const jobValidation = [
  body('title').trim().notEmpty().withMessage('Job title is required'),
  body('description').trim().notEmpty().withMessage('Job description is required'),
  body('company').trim().notEmpty().withMessage('Company name is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('state').isIn(['Andhra Pradesh', 'Karnataka', 'Kerala', 'Tamil Nadu', 'Telangana', 'Puducherry'])
    .withMessage('Invalid state'),
  body('jobType').isIn(['part-time', 'full-time', 'work-from-home']).withMessage('Invalid job type'),
  body('salary').trim().notEmpty().withMessage('Salary information is required')
];

router.get('/', getAllJobs);
router.get('/my-jobs', protect, verified, authorize('client'), getMyJobs);
router.get('/:id', getJobById);
router.post('/', protect, verified, authorize('client', 'admin'), jobValidation, createJob);
router.put('/:id', protect, verified, authorize('client', 'admin'), jobValidation, updateJob);
router.delete('/:id', protect, verified, authorize('client', 'admin'), deleteJob);

module.exports = router;
