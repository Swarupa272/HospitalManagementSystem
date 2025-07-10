const express = require("express");
const router = express.Router();
const{getNurses,getAllNurses,profileUpdate,addNurse}=require('../controllers/nurseController')
router.get("/get-nurses",getNurses);
router.get("/get-allNurses",getAllNurses);
router.put("/profile-update",profileUpdate);
router.post("/add-nurse",addNurse);

module.exports = router;

