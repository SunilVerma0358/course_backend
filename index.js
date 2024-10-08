const express = require("express");
const mongoose = require("mongoose");
const port = 3010;
const cors = require("cors");
const app = express();
const { mongodpConnect } = require("./connection");
const Users = require("./routes/user");
const Admins = require("./routes/admin");
const Courses = require("./routes/course");
app.use(express.json());
app.use(cors());
mongodpConnect(
  "mongodb+srv://SunilParjapati:Sunil12@atlascluster.4txewee.mongodb.net/"
);
app.use("/user", Users);
app.use("/admin", Admins);
app.use("/course", Courses);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
