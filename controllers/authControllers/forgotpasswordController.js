const jwt = require("jsonwebtoken");
const Admin = require("../../models/adminModel");
const path = require("path");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "No account with that email found." });
    }

    // Generate reset token
    const token = crypto.randomBytes(20).toString("hex");
    admin.resetPasswordToken = token;
    admin.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await admin.save();

    // Create the email content
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        admin: process.env.EMAIL_USER,
        admin: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: admin.email,
      from: process.env.EMAIL_USER,
      subject: "Password Reset",
      text:
        `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
        `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
        `http://${req.headers.host}/reset-password/${token}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };
    // console.log(mailOptions)

    // Send the email
    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ message: 'Error sending the email. Please try again later.' });
      }
      res.status(200).json({ message: 'Password reset email sent.' });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
