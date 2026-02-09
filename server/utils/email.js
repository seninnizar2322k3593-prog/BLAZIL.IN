const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send verification email with OTP
exports.sendVerificationEmail = async (email, code) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: `"BLAZIL.IN" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify Your Email - BLAZIL.IN',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FFB6C1;">Welcome to BLAZIL.IN!</h2>
        <p>Thank you for registering with BLAZIL.IN - South India's Premier Job Portal.</p>
        <p>Your verification code is:</p>
        <div style="background-color: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="color: #000; font-size: 36px; letter-spacing: 5px; margin: 0;">${code}</h1>
        </div>
        <p>This code will expire in 15 minutes.</p>
        <p>If you didn't create an account, please ignore this email.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
        <p style="color: #666; font-size: 12px;">BLAZIL.IN - Connecting Talent in South India</p>
      </div>
    `
  };
  
  await transporter.sendMail(mailOptions);
};

// Generate random 6-digit verification code (OTP)
exports.generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Legacy function for backward compatibility
exports.generateVerificationToken = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
