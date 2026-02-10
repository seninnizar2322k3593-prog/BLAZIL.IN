# BLAZIL.IN - Quick Setup Guide

## Prerequisites
- Node.js v14+ installed
- MongoDB installed and running (or use MongoDB Atlas)
- Git installed

## Step 1: Clone the Repository
```bash
git clone https://github.com/seninnizar2322k3593-prog/BLAZIL.IN.git
cd BLAZIL.IN
```

## Step 2: Backend Setup

### Install Dependencies
```bash
cd server
npm install
```

### Configure Environment Variables
Create a `.env` file in the `server` directory:
```bash
cp ../.env.example .env
```

Edit `.env` and update the following variables:

**IMPORTANT: You MUST configure a valid MongoDB connection string**

#### Option 1: Local MongoDB (Recommended for Development)
```env
MONGO_URI=mongodb://localhost:27017/blazil_db
```

#### Option 2: MongoDB Atlas (Recommended for Production)
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/blazil_db?retryWrites=true&w=majority
```

Replace `username`, `password`, and `cluster` with your MongoDB Atlas credentials.

**Common MongoDB Atlas Setup:**
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user with a password
3. Whitelist your IP address (or use 0.0.0.0/0 for development)
4. Copy the connection string and replace `<password>` with your database user password
5. Ensure the connection string starts with `mongodb+srv://`

**Other Required Variables:**
```env
JWT_SECRET=your-random-secret-key-here

# For Gmail SMTP (enable 2FA and create app password)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### Start MongoDB (if running locally)
```bash
# On Linux/Mac
sudo systemctl start mongod

# On Mac with Homebrew
brew services start mongodb-community

# On Windows
net start MongoDB
```

### Start Backend Server
```bash
npm start
# or for development with auto-reload
npm run dev
```

Server will run on `http://localhost:5000`

## Step 3: Frontend Setup

### Install Dependencies
```bash
cd ../client
npm install
```

### Configure Environment (Optional)
Create a `.env` file in the `client` directory:
```bash
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

### Start Frontend App
```bash
npm start
```

App will open in browser at `http://localhost:3000`

## Step 4: Create Admin Account

### Option 1: Login with Default Admin Credentials
Once the app is running:
1. Go to http://localhost:3000/login
2. Use these credentials:
   - Email: `bslxrnilagiribsccs@gmail.com`
   - Password: `Basilreji@0071`
3. The account will be automatically set as admin

### Option 2: Register a New Admin Account
1. Register a regular account
2. Manually update the user role in MongoDB:
```bash
# Connect to MongoDB
mongo blazil-in

# Update user role
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin", isVerified: true } }
)
```

## Step 5: Testing the Application

### Test Backend API
```bash
# Health check
curl http://localhost:5000/api/health

# Should return: {"status":"OK","message":"BLAZIL.IN API is running"}
```

### Test Frontend
1. Register a new account (Student/Normal/Client)
2. Check email for verification code
3. Verify email
4. Browse jobs
5. Apply for jobs (if Student/Normal)
6. Post jobs (if Client)
7. Access admin dashboard (if Admin)

## Common Issues & Solutions

### MongoDB Connection Error (querySrv ECONNREFUSED / ENOTFOUND)

**This is the most common error when starting the server.**

**Symptoms:**
```
Error: querySrv ECONNREFUSED _mongodb._tcp.xxxxx.mongodb.net
```

**Causes & Solutions:**

1. **Missing or Invalid MONGO_URI**
   - Check that `.env` file exists in the `server` directory
   - Verify `MONGO_URI` is set and not empty
   - Ensure the connection string starts with `mongodb://` or `mongodb+srv://`

2. **Incorrect MongoDB Atlas Connection String**
   - Format should be: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
   - Replace `<password>` placeholder with actual password
   - Remove angle brackets `<` `>` from the connection string
   - Ensure no spaces in the connection string

3. **IP Not Whitelisted (MongoDB Atlas)**
   - Go to MongoDB Atlas → Network Access
   - Add your current IP or use `0.0.0.0/0` (allows all IPs - for development only)

4. **Local MongoDB Not Running**
   - If using local MongoDB, ensure the service is started
   - Check if MongoDB is listening on port 27017

5. **Network/Firewall Issues**
   - Check firewall settings
   - Verify internet connection for MongoDB Atlas

**Quick Fix:**
```bash
# 1. Navigate to server directory
cd server

# 2. Check if .env exists
ls -la .env

# 3. Edit .env and set a valid MONGO_URI
nano .env  # or use your preferred editor

# 4. For quick testing, use local MongoDB:
MONGO_URI=mongodb://localhost:27017/blazil_db

# 5. Restart the server
npm start
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check if MONGO_URI is correct
- For Atlas, ensure IP is whitelisted

### Email Not Sending
- Use Gmail with App Password (not regular password)
- Enable 2-factor authentication
- Generate app-specific password in Google Account settings
- Update EMAIL_USER and EMAIL_PASS in .env

### Port Already in Use
```bash
# Change PORT in server/.env to a different port
# Update REACT_APP_API_URL in client/.env accordingly
```

### CORS Errors
- Ensure CLIENT_URL in server/.env matches frontend URL
- Check browser console for specific error

## Default User Roles

### Student
- Can apply for part-time and full-time jobs
- View application history

### Normal User
- Can apply for full-time and work-from-home jobs only
- View application history

### Client
- Post part-time and full-time jobs
- Manage posted jobs
- View applications

### Admin
- Full access to all features
- Approve/reject jobs
- View all users and applications
- Manage business ideas

## Features Checklist

- ✅ User registration with email verification
- ✅ Role-based access control
- ✅ Job posting and browsing
- ✅ Job application with resume upload
- ✅ Auto-deletion of part-time jobs after 24 hours
- ✅ Admin dashboard
- ✅ Business World feature
- ✅ Responsive design (mobile, tablet, desktop)

## Next Steps

1. Configure production environment variables
2. Set up cloud storage for resumes (AWS S3/Cloudinary)
3. Deploy backend to Heroku/Railway/Render
4. Deploy frontend to Vercel/Netlify
5. Set up production MongoDB (MongoDB Atlas)
6. Configure production email service

## Support

For issues or questions:
- Email: bslxrnilagiribsccs@gmail.com
- WhatsApp: +91 9747835717

## License

MIT License
