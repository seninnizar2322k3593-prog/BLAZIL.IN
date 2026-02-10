const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Validate MONGO_URI is set
    if (!process.env.MONGO_URI) {
      throw new Error(
        'MONGO_URI environment variable is not defined.\n' +
        'Please create a .env file in the root directory and set MONGO_URI.\n' +
        'Example: MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority\n' +
        'See .env.example for reference.'
      );
    }

    // Validate MONGO_URI format
    if (!process.env.MONGO_URI.startsWith('mongodb://') && !process.env.MONGO_URI.startsWith('mongodb+srv://')) {
      throw new Error(
        'MONGO_URI must start with "mongodb://" or "mongodb+srv://".\n' +
        'Current value: ' + process.env.MONGO_URI
      );
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    if (error.message.includes('querySrv') || error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED') || error.message.includes('EREFUSED')) {
      console.error('\nTroubleshooting tips:');
      console.error('1. Verify your MongoDB connection string is correct');
      console.error('2. Check if your IP address is whitelisted in MongoDB Atlas');
      console.error('3. Ensure your database user credentials are correct');
      console.error('4. Verify network connectivity to MongoDB');
      console.error('5. See server/MONGODB_SETUP.md for detailed setup instructions');
    }
    process.exit(1);
  }
};

module.exports = connectDB;
