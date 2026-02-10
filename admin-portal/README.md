# BLAZIL.IN Admin Portal

A separate admin portal for managing the BLAZIL.IN job portal platform.

## 🌟 Features

- **Secure Admin Login**: Dedicated authentication for administrators
- **Dashboard Statistics**: Overview of users, jobs, applications, and business ideas
- **User Management**: View all registered users with their roles and verification status
- **Job Management**: 
  - View all jobs (approved and pending)
  - Approve or reject job postings
  - Delete inappropriate jobs
- **Application Tracking**: Monitor all job applications
- **Business Ideas**: Review and manage business proposals submitted through the platform

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- Backend server running on port 5000

### Installation

1. Navigate to the admin portal directory:
```bash
cd admin-portal
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The admin portal will run on `http://localhost:3000`

## 🔐 Admin Access

**Default Admin Credentials:**
- Email: bslxrnilagiribsccs@gmail.com
- Password: Basilreji@0071

⚠️ **Security Warning:** Change these credentials in a production environment!

## 📋 Admin Portal Pages

### Login Page (`/login`)
- Secure authentication for admin users only
- Test account button for easy testing
- Form validation and error handling

### Dashboard (`/dashboard`)
- **Statistics Tab**: Overview of platform metrics
  - Total users, jobs, applications
  - User breakdown by role
  - Pending job count
  - Business ideas count

- **Users Tab**: Complete list of all registered users
  - Name, email, role, verification status
  - Registration date

- **Jobs Tab**: Manage all job postings
  - View job details
  - Approve pending jobs
  - Delete jobs

- **Applications Tab**: Track all job applications
  - Applicant information
  - Job details
  - Application status

- **Business Ideas Tab**: Review business proposals
  - Contact information
  - Business idea details
  - Mark as contacted or reject

## 🛠️ Tech Stack

- **React 18**: Modern React with hooks
- **React Router v6**: Client-side routing
- **Axios**: HTTP requests to backend API
- **Context API**: State management for authentication
- **CSS3**: Custom styling with responsive design

## 📁 Project Structure

```
admin-portal/
├── public/
│   └── index.html
├── src/
│   ├── components/        # Reusable components (future)
│   ├── pages/
│   │   ├── Login.js       # Admin login page
│   │   ├── Login.css
│   │   ├── Dashboard.js   # Main admin dashboard
│   │   └── Dashboard.css
│   ├── context/
│   │   └── AuthContext.js # Authentication context
│   ├── utils/
│   │   └── api.js         # Axios configuration
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## 🔌 API Endpoints Used

The admin portal connects to the following backend endpoints:

- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin info
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - List all users
- `GET /api/admin/jobs` - List all jobs
- `GET /api/admin/applications` - List all applications
- `GET /api/admin/business-ideas` - List business ideas
- `PUT /api/admin/jobs/:id/approve` - Approve job
- `DELETE /api/admin/jobs/:id` - Delete job
- `PUT /api/admin/business-ideas/:id` - Update business idea status

## 🎨 Design

### Theme Colors
- **Primary**: Soft Pink (#FFB6C1)
- **Secondary**: Hot Pink (#FF69B4)
- **Background**: Light Gray (#f5f5f5)

### Responsive Design
- Mobile-first approach
- Fully responsive across all devices
- Clean and intuitive admin interface

## 🔒 Security Features

- JWT-based authentication
- Admin role verification
- Protected routes
- Token stored in localStorage
- Automatic logout on token expiration
- HTTPS recommended for production

## 📝 Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 🌐 Deployment

The admin portal can be deployed separately from the main client application:

1. Build the production version
2. Deploy to a separate subdomain (e.g., `admin.blazil.in`)
3. Configure environment variables for the API URL
4. Ensure proper CORS settings on the backend

## 📞 Support

For support, email bslxrnilagiribsccs@gmail.com

## 📄 License

This project is part of BLAZIL.IN and follows the same MIT License.
