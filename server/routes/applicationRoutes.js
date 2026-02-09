const express = require('express');
const router = express.Router();
const {
  applyForJob,
  getUserApplications,
  getJobApplications,
  updateApplicationStatus
} = require('../controllers/applicationController');
const { protect, verified, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', protect, verified, authorize('student', 'normal'), upload.single('resume'), applyForJob);
router.get('/user', protect, verified, getUserApplications);
router.get('/job/:jobId', protect, verified, authorize('client', 'admin'), getJobApplications);
router.put('/:id/status', protect, verified, authorize('client', 'admin'), updateApplicationStatus);

module.exports = router;
