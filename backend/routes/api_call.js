const express = require("express");
const app = express();

app.use("/userlist", require("./api/userlist"));
app.use("/adduser", require("./api/adduser"));
app.use("/update_location", require("./api/update_location"));

module.exports = app;
