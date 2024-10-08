const express = require("express");
const {
  adminSignup,
  adminLogin,
  adminUpdate,
  addCourse,
  allUser,
  deleteUser,
  updateCourse,
} = require("../controllers/admin");
const router = express.Router();
router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.put("/update", adminUpdate);
router.post("/addCourse", addCourse);
router.post("/allUser", allUser);
router.put("/updateCourse", updateCourse);
router.post("/deleteCourse", deleteUser);
module.exports = router;
