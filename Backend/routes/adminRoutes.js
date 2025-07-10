const express = require("express");
const router = express.Router();
const{getUsers,deleteUser,addDepartment,deleteDepartment,
getDepartment,getCount}=require('../controllers/adminController')
router.get("/get-users",getUsers);
router.delete("/delete-user/:id",deleteUser);
router.post("/add-department",addDepartment);
router.delete("/delete-department/:id",deleteDepartment);
router.get("/get-department",getDepartment);
router.get("/get-count",getCount);
module.exports = router;
