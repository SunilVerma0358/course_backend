const { Course } = require("../modals/index");
async function allCourse(req, res) {
  try {
    const course = await Course.find();
    if (!course.lenght) {
      res.status(404).send({ message: "No Courses found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).send({ message: "Internet server error", error });
  }
}
module.exports = { allCourse };
