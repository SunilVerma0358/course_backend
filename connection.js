const mongoose = require("mongoose");
async function mongodpConnect(url) {
  await mongoose
    .connect(url)
    .then(() => console.log("connected to mongodb"))
    .catch((err) => console.log("mongoose not connected", err));
}
module.exports = { mongodpConnect };
