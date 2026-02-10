# BLAZIL.IN - South India Job Portal

A full-stack MERN (MongoDB, Express.js, React, Node.js) web application for job opportunities across South India.

## 🌟 Features

### Core Features
- **Job Listings**: Part-time, full-time, and work-from-home jobs
- **Auto-Expiry**: Part-time jobs automatically expire after 24 hours
- **Multiple User Roles**: Student, Normal User, Client/Employer, Admin
- **Email Verification**: Secure signup with 6-digit OTP email verification
- **Resume Upload**: File upload functionality for job applications
- **Business World**: Connect entrepreneurs with investors
- **Admin Dashboard**: Complete management system for jobs, users, and applications
- **Separate Admin Portal**: Dedicated standalone admin portal application
- **Test Credentials**: Pre-filled test accounts for easy testing

### User Roles

#### Student User
- Apply for part-time and full-time jobs
- Upload resume during application
- View application history

#### Normal User
- Apply for full-time and work-from-home jobs only
- Resume upload required
- Track application status

#### Client/Employer
- Post part-time and full-time job offers
- Manage posted jobs
- View applications

#### Admin
- View all users, jobs, and applications
- Approve or delete job posts
- Manage business idea submissions
- Dashboard with analytics
- Access via separate admin login page

### Test Credentials

The application comes with pre-configured test accounts for easy testing:

**User Login** (`/login`):
- **Student**: student@test.com / Student123
- **Normal User**: user@test.com / User123
- **Client**: client@test.com / Client123

**Admin Login** (`/admin/login`):
- **Admin**: bslxrnilagiribsccs@gmail.com / Basilreji@0071

Test credentials are displayed on the login pages with a "Use Test Account" button for quick filling.

**⚠️ Security Warning:** The pre-filled test credentials are for development and testing only. In a production environment, remove or disable the test credential display to prevent unauthorized access.

## 🛠️ Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing
- Multer for file uploads
- NodeMailer for email verification
- Node-cron for scheduled tasks
- Express-validator for validation

### Frontend
- React.js 18
- React Router v6
- Axios for API calls
- Context API for state management
- CSS3 with custom styling

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/seninnizar2322k3593-prog/BLAZIL.IN.git
cd BLAZIL.IN
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory (or use the provided `.env` file):
```env
# Server
PORT=5000
NODE_ENV=development

# Database - Replace with your MongoDB connection string
MONGO_URI=your_mongodb_connection_string_here
DB_NAME=blazil_db

# JWT - Replace with a strong random secret
JWT_SECRET=your_secure_jwt_secret_key_here

# Email Configuration - Setup Gmail App Password
# 1. Enable 2-factor authentication on your Gmail account
# 2. Go to Google Account Settings > Security > App Passwords
# 3. Generate a new app password for "Mail"
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password_here

# Admin Credentials
ADMIN_EMAIL=bslxrnilagiribsccs@gmail.com
ADMIN_PASSWORD=Basilreji@0071

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads/resumes

# Frontend URL
CLIENT_URL=http://localhost:3000
```

**⚠️ Production Note:** The MongoDB URI and admin credentials shown in this example are for demonstration purposes. In production, use environment variables and never commit sensitive credentials to version control.

Seed the database with test users:
```bash
npm run seed
```

This will create the following test accounts:
- **Student**: student@test.com / Student123
- **Normal User**: user@test.com / User123
- **Client**: client@test.com / Client123
- **Admin**: bslxrnilagiribsccs@gmail.com / Basilreji@0071

Start the backend server:
```bash
npm run dev
# or
npm start
```

The server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file in the client directory (optional):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the React app:
```bash
npm start
```

The app will run on `http://localhost:3000`

### 4. Admin Portal Setup (Separate Application)

The admin portal is a standalone React application in a separate folder:

```bash
cd admin-portal
npm install
```

Start the admin portal:
```bash
npm start
```

The admin portal will run on `http://localhost:3000` (or another port if 3000 is already in use)

**Note:** Admin accounts are created through the backend seed script. In development mode, a test account button is available for quick access.

See [admin-portal/README.md](admin-portal/README.md) for detailed admin portal documentation and setup instructions.

## 📁 Project Structure

```
BLAZIL.IN/
├── client/                 # React frontend (User-facing)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Navbar.js
│   │   │   └── JobCard.js
│   │   ├── pages/          # Page components
│   │   │   ├── Home.js
│   │   │   ├── Register.js
│   │   │   ├── Login.js
│   │   │   ├── Jobs.js
│   │   │   ├── Dashboard.js
│   │   │   └── BusinessWorld.js
│   │   ├── context/        # Context providers
│   │   │   └── AuthContext.js
│   │   ├── utils/          # Utility functions
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
├── admin-portal/           # Separate admin portal application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/          # Admin pages (Login, Dashboard)
│   │   ├── context/        # Auth context
│   │   ├── utils/          # API utilities
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md           # Admin portal documentation
│
├── server/                 # Node.js backend
│   ├── config/             # Configuration files
│   │   └── db.js
│   ├── models/             # Mongoose models
│   │   ├── User.js
│   │   ├── Job.js
│   │   ├── Application.js
│   │   └── BusinessIdea.js
│   ├── routes/             # API routes
│   │   ├── authRoutes.js
│   │   ├── jobRoutes.js
│   │   ├── applicationRoutes.js
│   │   ├── adminRoutes.js
│   │   └── businessRoutes.js
│   ├── controllers/        # Route controllers
│   │   ├── authController.js
│   │   ├── jobController.js
│   │   ├── applicationController.js
│   │   ├── adminController.js
│   │   └── businessController.js
│   ├── middleware/         # Middleware
│   │   ├── auth.js
│   │   └── upload.js
│   ├── utils/              # Utility functions
│   │   ├── email.js
│   │   ├── token.js
│   │   └── cronJobs.js
│   ├── server.js
│   └── package.json
│
├── .env.example
├── .gitignore
└── README.md
```

## 🔌 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-email` - Verify email with 6-digit OTP code
- `POST /api/auth/resend-verification` - Resend verification code
- `GET /api/auth/me` - Get current user

### Job Routes
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/:id` - Get single job
- `GET /api/jobs/my-jobs` - Get user's posted jobs (Client)
- `POST /api/jobs` - Create job (Client/Admin)
- `PUT /api/jobs/:id` - Update job (Client/Admin)
- `DELETE /api/jobs/:id` - Delete job (Client/Admin)

### Application Routes
- `POST /api/applications` - Apply for job (with resume upload)
- `GET /api/applications/user` - Get user's applications
- `GET /api/applications/job/:jobId` - Get applications for a job
- `PUT /api/applications/:id/status` - Update application status

### Admin Routes
- `GET /api/admin/users` - Get all users
- `GET /api/admin/jobs` - Get all jobs
- `GET /api/admin/applications` - Get all applications
- `GET /api/admin/stats` - Get dashboard statistics
- `PUT /api/admin/jobs/:id/approve` - Approve job
- `DELETE /api/admin/jobs/:id` - Delete job
- `GET /api/admin/business-ideas` - Get business ideas
- `PUT /api/admin/business-ideas/:id` - Update business idea status

### Business Routes
- `POST /api/business/contact` - Submit business idea

## 🔧 Backend Improvements

The backend has been enhanced with several critical fixes:

### Security Enhancements
- ✅ **Removed hardcoded admin credentials** from login logic
- ✅ **Added request validation** with express-validator in all controllers
- ✅ **Improved error handling** for file uploads with multer
- ✅ **Added null/undefined checks** for protected routes

### Bug Fixes
- ✅ **Fixed search filter bug** that was overwriting job expiry conditions
- ✅ **Added validation middleware** to PUT/DELETE routes
- ✅ **Improved error messages** with proper development vs production handling
- ✅ **Added multer error handler** for better file upload error messages

### Code Quality
- ✅ All controllers now use `validationResult` from express-validator
- ✅ Proper error handling across all endpoints
- ✅ Consistent validation patterns
- ✅ Clean separation of concerns

## 🎨 Design

### Theme Colors
- **Primary**: Soft Pink (#FFB6C1)
- **Secondary**: Black (#000000)
- **Accents**: Light Pink (#FFE4E9), Dark Pink (#FF69B4)

### Responsive Design
- Mobile-first approach
- Fully responsive across all devices
- Clean and intuitive UI

## 📧 Email Configuration

For Gmail, you need to:
1. Enable 2-factor authentication
2. Generate an app-specific password
3. Use the app password in the `EMAIL_PASS` environment variable

## ⏰ Automated Tasks

The application uses node-cron to automatically delete expired part-time jobs every hour.

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Email verification required
- Protected API routes
- File upload validation

## 🌍 Supported States

- Andhra Pradesh
- Karnataka
- Kerala
- Tamil Nadu
- Telangana
- Puducherry

## 📝 Business World Feature

Entrepreneurs can submit business ideas through the Business World section:
- Submit business proposals
- Admin reviews submissions
- Connect with investors
- Direct contact options (Email & WhatsApp)

**Contact Information:**
- Email: bslxrnilagiribsccs@gmail.com
- WhatsApp: +91 9747835717

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Author

Created for BLAZIL.IN - Connecting talent with opportunities across South India

## 🐛 Known Issues

- File uploads are stored locally (consider cloud storage for production)
- Email sending requires proper SMTP configuration

## 🚀 Future Enhancements

- Real-time chat between investors and clients
- Advanced job search with filters
- Job recommendation system
- Mobile app version
- Payment integration for premium features
- Cloud storage integration (AWS S3/Cloudinary)

## 📞 Support

For support, email bslxrnilagiribsccs@gmail.com or contact via WhatsApp at +91 9747835717
