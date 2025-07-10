const bcrypt = require("bcrypt");
const Appointment = require("../models/appointment");
const User = require("../models/user");
exports.getDoctors=async (req, res) => {

    try {
      const doctors = await User.find({ role: "doctor" });
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ error: error.message });
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
  exports.deleteDoctor= async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findByIdAndDelete(userId);
      res.json({ msg: "Doctor deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

exports.addDoctor= async (req, res) => {
  const { userName, email  } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Doctor with this email already exists" });
    }
    const firstemail = email.split('@')[0];
    const password = firstemail + '@123' ;
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      role: "doctor",
    });

    const savedUser = await newUser.save();

    res.status(200).json({savedUser,message:"Success"});
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error)
  }
};

exports.getAppointments= async (req, res) => {
  const doctorId = req.params.id;
  try{
    const appointments = await Appointment.find({ doctorId });
    
    if(appointments.length === 0){
      return res.json({ message: "No appointments found" });
    }else{
      res.json(appointments);
    }
    
  }catch(error){
    res.status(500).json({ error: error.message });
  }
}



