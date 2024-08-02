const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const path = require("path");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email)
  console.log(password)
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