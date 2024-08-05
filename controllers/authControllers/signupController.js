const Admin = require("../../models/adminModel");
const User = require("../../models/userModel");

exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body;
  console.log(username);
  console.log(email);
  console.log(password);
  console.log(role);

  try {
    if (role === 'admin') {
      // Create and save an admin
      const admin = new Admin({ username, email, password, role });
      await admin.save();
      res.json({ message: "Admin account created" });
    } else if (role === 'user') {
      // Create and save a user
      const user = new User({ username, email, password, role });
      await user.save();
      res.json({ message: "User account created" });
    } else {
      res.status(400).json({ message: "Invalid role specified" });
    }
  } catch (err) {
    console.log(req.body);
    res.status(400).json({ message: err.message });
  }
};
