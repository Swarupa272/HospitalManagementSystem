const mongoose = require("mongoose");
exports.connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB Connected!");
  } catch (e) {
    console.log(e);
  }
};