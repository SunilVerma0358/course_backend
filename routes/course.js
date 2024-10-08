const express = require("express");
const { allCourse } = require("../controllers/course");
const router = express.Router();
router.post("/allCourse", allCourse);
module.exports = router;
