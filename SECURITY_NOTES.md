# Security Notes

## Overview
This document outlines security considerations for the BLAZIL.IN application.

## Security Checks Performed

### CodeQL Analysis
CodeQL security scanning has been performed on the codebase. The following findings were identified:

#### 1. Missing Rate Limiting on Authentication Routes
- **Severity**: Medium
- **Location**: `server/routes/authRoutes.js:28` (verify-email endpoint)
- **Description**: The `/api/auth/verify-email` route performs database access but lacks rate limiting protection
- **Impact**: Could be vulnerable to brute-force attacks attempting to guess verification codes
- **Status**: Acknowledged - Existing issue, not introduced in this PR

**Recommendation**: Implement rate limiting middleware (e.g., express-rate-limit) on authentication endpoints to prevent abuse:
```javascript
const rateLimit = require('express-rate-limit');

const verifyEmailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many verification attempts, please try again later'
});

router.post('/verify-email', verifyEmailLimiter, verifyEmail);
```

## Security Best Practices Implemented

### ✅ Authentication & Authorization
- JWT-based authentication with secure token generation
- Password hashing using bcrypt with salt rounds
- Role-based access control (RBAC) for different user types
- Email verification required for new accounts

### ✅ Data Validation
- Input validation using express-validator
- Mongoose schema validation on all models
- Email format validation
- Password strength requirements (minimum 6 characters)

### ✅ Email Verification
- 6-digit OTP codes for email verification
- Time-based expiry (15 minutes) for verification codes
- Codes stored securely in the database
- Resend verification functionality with new code generation

### ✅ File Upload Security
- File type validation (PDF, DOC, DOCX only)
- File size limits (5MB maximum)
- Multer middleware for secure file handling

### ✅ Environment Security
- Sensitive credentials stored in .env file (excluded from git)
- JWT secret configured via environment variables
- Database credentials not hardcoded in source code

## Production Security Checklist

Before deploying to production, ensure the following:

### High Priority
- [ ] Implement rate limiting on all authentication endpoints
- [ ] Use strong, randomly generated JWT_SECRET (not the default one)
- [ ] Update MongoDB credentials and restrict IP access
- [ ] Enable HTTPS/SSL certificates for all communications
- [ ] Remove or disable test credential displays in login pages
- [ ] Configure CORS to only allow trusted origins
- [ ] Set up proper error handling without exposing stack traces

### Medium Priority
- [ ] Implement account lockout after failed login attempts
- [ ] Add request logging and monitoring
- [ ] Set up security headers (helmet.js)
- [ ] Implement CSRF protection for state-changing operations
- [ ] Add input sanitization to prevent XSS attacks
- [ ] Configure email service with app-specific password (not account password)

### Low Priority
- [ ] Implement refresh token rotation
- [ ] Add two-factor authentication (2FA) option for admin accounts
- [ ] Set up automated security scanning in CI/CD pipeline
- [ ] Configure database connection pooling and timeout settings
- [ ] Implement audit logging for admin actions

## Known Security Limitations

1. **Test Credentials Displayed**: The login pages display test credentials for development convenience. This must be removed in production.

2. **Hardcoded Admin Credentials**: Admin credentials are currently hardcoded in the authentication controller. Consider implementing a more secure admin management system.

3. **Local File Storage**: Resume files are stored locally on the server. Consider migrating to cloud storage (AWS S3, Cloudinary) for better security and scalability.

4. **No Rate Limiting**: Currently, there is no rate limiting on API endpoints, making the application vulnerable to brute-force and DoS attacks.

## Reporting Security Issues

If you discover a security vulnerability, please email: bslxrnilagiribsccs@gmail.com

Do not create public GitHub issues for security vulnerabilities.

## Last Updated
February 9, 2026
