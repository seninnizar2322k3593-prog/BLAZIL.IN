require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Test users to create
const testUsers = [
  {
    name: "Test Student",
    email: "student@test.com",
    password: "Student123",
    role: "student",
    isVerified: true
  },
  {
    name: "Test User",
    email: "user@test.com",
    password: "User123",
    role: "normal",
    isVerified: true
  },
  {
    name: "Test Client",
    email: "client@test.com",
    password: "Client123",
    role: "client",
    isVerified: true
  },
  {
    name: "Admin",
    email: "bslxrnilagiribsccs@gmail.com",
    password: "Basilreji@0071",
    role: "admin",
    isVerified: true
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('Seeding database with test users...');
    
    // Clear existing test users
    await User.deleteMany({
      email: { 
        $in: testUsers.map(u => u.email) 
      }
    });
    
    console.log('Deleted existing test users');
    
    // Create test users
    for (const userData of testUsers) {
      const user = await User.create(userData);
      console.log(`✓ Created user: ${user.name} (${user.email}) - Role: ${user.role}`);
    }
    
    console.log('\n✅ Database seeded successfully!');
    console.log('\nTest Credentials:');
    console.log('================');
    testUsers.forEach(user => {
      console.log(`${user.role.toUpperCase()}: ${user.email} / ${user.password}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed
seedDatabase();
