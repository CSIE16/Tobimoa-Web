const express = require("express");
const app = express();
const indexRouter = require('./routes/index');
const history = require('connect-history-api-fallback');

let port = 5000;

app.use(history());
app.use(express.static('public'));
app.use('/',indexRouter);

app.listen(port,() => {
    console.log("Running at localhost:" + port);
});