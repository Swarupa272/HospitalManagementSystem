const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const appointmentSchema = new Schema({
  doctor: {
    type:String,
    required: true,
  },
  patient: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: String,
    required: true,
  },
  time:{
    type: String,
    default: "",
  },
  reason: {
    type: String,
  },
  phone:{
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["scheduled", "inProgress", "completed", "cancelled"],
    default: "scheduled",
  },
  email:{
    type: String,
    required: true,
  }
},{timestamps: true});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
