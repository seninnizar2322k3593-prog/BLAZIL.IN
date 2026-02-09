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

// Send verification email
exports.sendVerificationEmail = async (email, token) => {
  const transporter = createTransporter();
  
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
  
  const mailOptions = {
    from: `"BLAZIL.IN" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify Your Email - BLAZIL.IN',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #FFB6C1;">Welcome to BLAZIL.IN!</h2>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verificationUrl}" 
           style="background-color: #FFB6C1; color: #000; padding: 10px 20px; 
                  text-decoration: none; border-radius: 5px; display: inline-block;">
          Verify Email
        </a>
        <p>Or use this verification code: <strong>${token}</strong></p>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't create an account, please ignore this email.</p>
      </div>
    `
  };
  
  await transporter.sendMail(mailOptions);
};

// Generate random verification token
exports.generateVerificationToken = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
