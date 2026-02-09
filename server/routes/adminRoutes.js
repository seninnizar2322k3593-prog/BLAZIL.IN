const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getAllJobs,
  approveJob,
  deleteJob,
  getAllApplications,
  getDashboardStats,
  getAllBusinessIdeas,
  updateBusinessIdeaStatus
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// All routes require admin authorization
router.use(protect, authorize('admin'));

router.get('/users', getAllUsers);
router.get('/jobs', getAllJobs);
router.put('/jobs/:id/approve', approveJob);
router.delete('/jobs/:id', deleteJob);
router.get('/applications', getAllApplications);
router.get('/stats', getDashboardStats);
router.get('/business-ideas', getAllBusinessIdeas);
router.put('/business-ideas/:id', updateBusinessIdeaStatus);

module.exports = router;
