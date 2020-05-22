require('dotenv').config();

const express = require("express");
const app = express();
const history = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const ApiRouter = require('./routes/api_call');

let port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', ApiRouter);

app.use(history());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));

app.listen(port,() => {
    console.log("Running at localhost:" + port);
});