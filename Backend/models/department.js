const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      head: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
      },
      staff: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Nurse",
      }],
},{timestamps: true});

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;