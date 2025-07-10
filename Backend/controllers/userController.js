const User = require("../models/user");
exports.getUsers= async (req ,res) =>{
  try {
    const findUser =  await User.find();
    if(!findUser) res.json("No user found");
    res
    .status(200)
    .json(findUser);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
}

exports.profileUpdate= async (req, res) => {
  const { userId, updatedProfile } = req.body;
  try {;
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

