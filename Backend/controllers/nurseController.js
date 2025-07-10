const  User  = require("../models/user");
const bcrypt = require("bcrypt");
exports.getNurses= async (req, res) => {
    try {
      const nurses = await User.find({ role: "nurse" }).populate( "userName");
  
      res.json(nurses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
exports.getAllNurses= async (req, res) => {
    try {
      const nurses = await User.find({ role: "nurse" });
      res.json(nurses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

exports.addNurse= async (req, res) => {
  const {userName, email} = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Nurse with this email already exists" });
    }
    const firstemail = email.split('@')[0];
    const password = firstemail + '@123' ;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      role: "nurse",
    });

    const savedUser = await newUser.save();

    res.status(200).json({savedUser,message:"Success"});
  } catch (error) {
    res.status(500).json({error: error.message });
  }

}


exports.profileUpdate= async (req, res) => {
  const { userId, updatedProfile } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedProfile },
      { new: true, runValidators: true }
    );

    res.status(200).json({ status: "Success", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error.message);
  }
}

