const jwt = require("jsonwebtoken");
const User = require("../models/User");
const path = require("path");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username);
  console.log(email);
  console.log(password);
  try {
    const user = new User({ username, email, password });
    await user.save();
    // res.status(201).json({ message: "User registered successfully." });
    res.json({ message: "user account created" });
  } catch (err) {
    console.log(req.body);
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, message: "Logged In successful." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "No account with that email found." });
    }

    // Generate reset token
    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Create the email content
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT === "465",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: user.email,
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
        console.log(err);
        return res
          .status(500)
          .json({
            message: "Error sending the email. Please try again later.",
          });
      }
      res.status(200).json({ message: "Password reset email sent." });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
