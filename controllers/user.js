const { User, Course } = require("../modals/index");

function userSignup(req, res) {
  const { name, email, password, userId } = req.body;
  const user = new User({ name, email, password, userId });
  user
    .save()
    .then((data) => {
      res.status(200).send({ message: "User create successful", data });
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.status(400).send({ message: "User already exist", error: err });
      } else {
        res.status(500).send({ message: "Internet server error", error: err });
      }
    });
}
async function userLogin(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send({ message: "User not found" });
    }
    if (user.password !== password) {
      res.status(400).send({ message: "Invaild Password" });
    }
    res.json({ message: "User Login successful", email: user.email });
  } catch (error) {
    res.status(500).send({ message: "Internet server error", error });
  }
}
async function userUpdate(req, res) {
  const { password, newPassword } = req.body;
  try {
    const user = await User.findOne({ password });
    if (!user) {
      res.status(404).send({ message: "User not found" });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Password Change Successful" });
  } catch (error) {
    res.status(500).send({ message: "Internet server error", error });
  }
}
async function purchase(req, res) {
  try {
    const { email, courseId } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const alreadyPurchased = user.purchase.some((p) => p.CourseId === courseId);
    if (alreadyPurchased) {
      return res.status(400).json({ message: "Course already purchased" });
    }

    const course = await Course.findOne({ CourseId: courseId });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    user.purchase.push(course);

    await user.save();

    res.status(200).json({ message: "Course purchased successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
    console.error(error);
  }
}
async function getPurchase(req, res) {
  const email = req.query.email;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.purchase);
  } catch (error) {
    res.status(500).json({ message: "Internet Server error", error });
  }
}
async function completeCourse(req, res) {
  const { email, courseId } = req.body;
  const user = await User.findOne({ email });
  user.complete.push(courseId);
  user.save();
  res.status(200).json({ message: "Course completed successfully" });
}
module.exports = {
  userSignup,
  userLogin,
  userUpdate,
  purchase,
  getPurchase,
  completeCourse,
};
