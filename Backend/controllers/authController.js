const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user"); 

exports.register = async (req, res) => {
  const { userName, email, password, role, phoneNumber, dateOfBirth, gender, address } =
    req.body;
  try {
    if (!userName || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
      dateOfBirth,
      gender,
      address
    });
    const savedUser = await newUser.save();

    res.json({ savedUser, message: "Success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.jwtsecret,
      { expiresIn: "2d" }
    );

    res.cookie("token", token);
    res.json({ status: "Success", token, role: user.role, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "User Logged Out" });
};