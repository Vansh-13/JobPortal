import nodemailer from "nodemailer";

export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOtp = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS
    }
  });

  const mailOptions = {
    from: `"JobWorld.com" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Welcome to JobWorld.com - Your OTP for Login",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <h2 style="color: #2d89ef; text-align: center;">Welcome to <span style="color: #ff6600;">JobWorld.com</span> 👋</h2>
        <p>Dear user,</p>
        <p>We’re excited to have you onboard!</p>
        <p>You’re just one step away from accessing the best opportunities curated just for <strong>your skills and future goals</strong>.</p>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #f4f4f4; border-left: 4px solid #2d89ef;">
          <p style="font-size: 16px;"> <strong>Your OTP is:</strong></p>
          <p style="font-size: 24px; font-weight: bold; color: #2d89ef; letter-spacing: 2px; margin: 10px 0;">${otp}</p>
        </div>

        <p>Please enter this OTP to complete your login process. This OTP is valid for a short time only.</p>

        <hr style="margin: 30px 0;">
        <p style="font-size: 14px; color: #777;">
          If you didn’t request this, please ignore this email. Someone might have tried to access your account.
        </p>
        <p style="font-size: 14px; color: #777;">
          Thank you,<br><strong>Team JobWorld.com</strong>
        </p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};
