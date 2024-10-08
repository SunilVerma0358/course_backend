const { Admin, Course, User } = require("../modals/index");

function adminSignup(req, res) {
  const { name, email, password, adminId } = req.body;
  const admin = new Admin({ name, email, password, adminId });
  admin
    .save()
    .then((data) => {
      res.status(200).send({ message: "Admin create successful", data });
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.status(400).send({ message: "Admin already exist", error: err });
      } else {
        res.status(500).send({ message: "Internet server error", error: err });
      }
    });
}
async function adminLogin(req, res) {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      res.status(404).send({ message: "Admin not found" });
    }
    if (admin.password !== password) {
      res.status(400).send({ message: "Invaild Password" });
    }
    res.json({ message: "Admin Login successful", email: user.email });
  } catch (error) {
    res.status(500).send({ message: "Internet server error", error });
  }
}
async function adminUpdate(req, res) {
  const { password, newPassword } = req.body;
  try {
    const admin = await Admin.findOne({ password });
    if (!admin) {
      res.status(404).send({ message: "Admin not found" });
    }
    admin.password = newPassword;
    await admin.save();
    res.status(200).json({ message: "Password Change Successful" });
  } catch (error) {
    res.status(500).send({ message: "Internet server error", error });
  }
}
async function addCourse(req, res) {
  const { name, price, description, courseId } = req.body;
  const course = new Course({ name, price, description, courseId });
  course
    .save()
    .then((data) => {
      res.status(200).send({ message: "Admin create successful", data });
    })
    .catch((error) => {
      if (error.code === 11000) {
        res.status(400).send({ message: "Admin already exist", error });
      } else {
        res.status(500).send({ message: "Internet server error", error });
      }
    });
}
async function updateCourse(req, res) {
  try {
    const { name, price, description, courseId } = req.body;
    const updateCourses = await Course.findOneAndUpdate(
      {
        name,
        price,
        description,
        courseId,
      },
      { new: true }
    );
    if (!updateCourses) {
      res.status(404).send({ message: "course not found" });
    }

    await updateCourses.save();
    res.status(200).json({
      message: " Course Update Successful",
      courses: updateCourses,
    });
  } catch (error) {
    res.status(500).send({ message: "Internet server error", error });
  }
}
async function allUser(req, res) {
  try {
    const allUsers = await User.find();
    if (!allUsers.lenght) {
      res.status(404).send({ message: "No Users found" });
    }
    res.json(allUsers);
  } catch (error) {
    res.status(500).send({ message: "Internet server error", error });
  }
}
async function deleteUser(req, res) {
  try {
    const { email } = req.body;
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}
module.exports = {
  adminSignup,
  adminLogin,
  adminUpdate,
  addCourse,
  allUser,
  deleteUser,
  updateCourse,
};
