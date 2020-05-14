const express = require("express");
const app = express();

app.use("/adduser", require("./api/adduser"));

module.exports = app;
