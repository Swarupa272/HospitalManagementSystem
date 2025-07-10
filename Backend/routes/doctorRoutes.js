const express = require("express");
const router = express.Router();
const{getDoctors,profileUpdate,deleteDoctor,getAppointments,addDoctor}=require('../controllers/doctorController')

router.get("/get-doctors",getDoctors);
router.put("/profile-update",profileUpdate);
router.delete("/delete-doctor/:id",deleteDoctor);
router.get("/get-appointments/:id",getAppointments);
router.post("/add-doctor",addDoctor);

module.exports = router;