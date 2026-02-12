const mongoose = require('mongoose');

// Flag to prevent duplicate SIGINT handlers
let shutdownHandlerRegistered = false;

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

    // Connection event handlers - register BEFORE connection
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected from MongoDB');
    });

    // Connection options with pooling and retry logic
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Maximum number of connections in the pool
      minPoolSize: 2,  // Minimum number of connections in the pool
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      family: 4 // Use IPv4, skip trying IPv6
    };

    const conn = await mongoose.connect(process.env.MONGO_URI, options);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);

    // Graceful shutdown handling - register once
    if (!shutdownHandlerRegistered) {
      const gracefulShutdown = async (signal) => {
        console.log(`\nReceived ${signal}, closing MongoDB connection...`);
        try {
          await mongoose.connection.close();
          console.log('Mongoose connection closed gracefully');
          process.exit(0);
        } catch (err) {
          console.error('Error during graceful shutdown:', err);
          process.exit(1);
        }
      };

      // Handle SIGINT (Ctrl+C)
      process.on('SIGINT', () => gracefulShutdown('SIGINT'));
      
      // Handle SIGTERM (used by Docker, Kubernetes, PM2)
      process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

      shutdownHandlerRegistered = true;
    }

  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    const connectionErrors = ['querySrv', 'ENOTFOUND', 'ECONNREFUSED', 'EREFUSED'];
    if (connectionErrors.some(err => error.message.includes(err))) {
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
