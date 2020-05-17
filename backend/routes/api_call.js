const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const Index = path.basename(__filename);

fs.readdirSync(__dirname + '/api')
    .filter(
        file => file !== Index)
    .forEach(route=>{
        app.use(`/${route.split('.')[0]}`, require(`./api/${route}`));
    })

module.exports = app;
