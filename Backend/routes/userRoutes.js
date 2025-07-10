const express = require("express");
const router = express.Router();

const{getUsers,profileUpdate}=require('../controllers/userController')

router.get("/get-users",getUsers);
router.put("/profile-update",profileUpdate);
module.exports = router;