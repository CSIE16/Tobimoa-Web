const express = require("express");
const app = express();

app.use("/userlist", require("./api/userlist"));
app.use("/adduser", require("./api/adduser"));

module.exports = app;
