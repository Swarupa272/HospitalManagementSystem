const express = require("express");
const router = express.Router();

const {
  getAppointments, getAppointmentId, addAppointment,
} = require("../controllers/appointmentController");

router.get("/get-appointments/:email", getAppointments);
router.get("/get-appointment/:id", getAppointmentId);
router.post("/add-appointment", addAppointment);

module.exports = router;