const Appointment = require("../models/appointment");

exports.getAppointments = async (req, res) => {
  const { email } = req.params;
  try {
    const appointment = await Appointment.find({ email }).populate("doctor");
    if (appointment == null) {
      res.json({ message: "No Appointments Booked!" });
    } else {
      res.json(appointment);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAppointmentId = async (req, res) => {
  const { id } = req.params;
  try {
    const appointments = await Appointment.find({ doctor: id });

    if (appointments.length === 0) {
      res.json({ message: "No Appointments Booked!" });
    } else {
      res.json(appointments);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addAppointment = async (req, res) => {
  const { doctor, patient, appointmentDate, reason, phone, email, time } =
    req.body;

  try {
    const newAppointment = new Appointment({
      doctor,
      patient,
      appointmentDate,
      reason,
      phone,
      email,
      time,
    });
    const savedAppointment = await newAppointment.save();
    res.status(200).json(savedAppointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
