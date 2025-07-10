const cors = require("cors");
const express = require("express");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const {connectToDatabase} = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const nurseRoutes = require("./routes/nurseRoute");
const appointmentRoutes = require("./routes/appointmentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const checkAdmin = require("./middlewares/checkAdmin");
const checkAccess = require("./middlewares/checkAccess");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(
  {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
}));

app.use("/auth",authRoutes);
app.use("/user", userRoutes);
app.use("/doctor", doctorRoutes);
app.use("/nurse", nurseRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/admin", adminRoutes);
app.use(errorHandlerMiddleware);


(async () => {
  try {
     connectToDatabase();
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
  }
})();