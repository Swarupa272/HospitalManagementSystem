const User = require("../models/user");
const Department = require("../models/department");


exports.getUsers=async (req, res) => {
  try {
    const users = await User.find({role:"patient"});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
exports.deleteUser= async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
exports.addDepartment= async (req, res) => {
  const { userName, description, head, staff } = req.body;
  try {
    const existingdept = await Department.findOne({  });

    if (existingdept) {
      return res
        .status(400)
        .json({ error: "Department with same  already exists" });
    }
    const newDept = new Department({
      userName,
      description,
      head,
      staff,
    });

  const savedDept = await newDept.save();
    res.status(200).json(savedDept);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.deleteDepartment= async (req, res) => {
  try {
    const deletedDept = await Department.findByIdAndDelete(req.params.id);
    res.json(deletedDept);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getDepartment=async (req, res) => {
  try {
    const depts = await Department.find({}).populate("head", "");
    res.json(depts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getCount= async (req, res) => {
  try {
      const patientcou = await User.countDocuments({ role: "patient" }).exec();
      const deptcou = await Department.countDocuments({}).exec();
      const doccou = await User.countDocuments({role:"doctor"}).exec();
      const nursecou = await User.countDocuments({role:"nurse"}).exec();

      res.json({
          patientcou,
          deptcou,
          doccou,
          nursecou,
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}
