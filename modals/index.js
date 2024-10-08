const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  userId: { type: String },
});
const adminSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  adminId: { type: String },
});
const courseSchema = mongoose.Schema({
  name: { type: String },
  price: { type: String },
  description: { type: String },
  courseId: { type: String },
});
const User = new mongoose.model("user", userSchema);
const Admin = new mongoose.model("admin", adminSchema);
const Course = new mongoose.model("course", courseSchema);
module.exports = { User, Admin, Course };
