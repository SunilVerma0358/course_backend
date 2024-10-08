const express = require("express");
const { userSignup, userLogin, userUpdate } = require("../controllers/user");
const router = express.Router();
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.put("/update", userUpdate);
module.exports = router;
