const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const path = require("path");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username)
  console.log(email)
  console.log(password)
  try {
    const user = new User({ username, email, password });
    await user.save();
    // res.status(201).json({ message: "User registered successfully." });
    res.json({message: "user account created"});
  } catch (err) {
    console.log(req.body);
    res.status(400).json({ message: err.message });
  }
};