const Admin = require("../../models/adminModel"); // Ensure this is the correct path
const User = require("../../models/userModel"); // Import User model from its own file

exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  console.log(email); // Debugging
  console.log(password); // Debugging
  console.log(role); // Debugging

  try {
    let user;
    if (role === "admin") {
      user = await Admin.findOne({ email });
    } else if (role === "user") {
      user = await User.findOne({ email });
    } else {
      return res.status(400).json({ message: "Invalid role specified." });
    }

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token, message: "Logged in successfully." });
  } catch (err) {
    console.error(err); // Log the error
    res.status(400).json({ message: err.message });
  }
};
