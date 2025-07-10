const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["admin", "doctor", "nurse", "receptionist", "patient"],
        default: "patient"
      },
      phoneNumber: {
        type: String,
        default: "",
      },
      dateOfBirth: {
        type: Date,
        default: "",
      },
      gender: {
        type: String,
        default: "",
      },
      address: {
          type: Object,
          default: {}
        }
},{timestamps: true});

const User = mongoose.model("User", userSchema);
module.exports = User;