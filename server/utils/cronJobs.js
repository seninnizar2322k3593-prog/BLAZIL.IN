const cron = require('node-cron');
const Job = require('../models/Job');

// Schedule task to run every hour to delete expired jobs
const setupCronJobs = () => {
  cron.schedule('0 * * * *', async () => {
    try {
      console.log('Running cron job: Checking for expired jobs...');
      
      const result = await Job.deleteMany({
        expiresAt: { $lt: new Date() }
      });
      
      if (result.deletedCount > 0) {
        console.log(`Deleted ${result.deletedCount} expired job(s)`);
      } else {
        console.log('No expired jobs found');
      }
    } catch (error) {
      console.error('Error in cron job:', error);
    }
  });
  
  console.log('Cron job scheduled: Expired jobs will be deleted every hour');
};

module.exports = setupCronJobs;
