const mongoose = require("mongoose");
const User = require("./user");

const ProtectorSchema = new mongoose.Schema({
    Name: {type: String, required: true, trim : true},
    PhoneNum: {type: String, required: true, trim : true},
    Password: {type: String, required: true, trim : true},
    Child : {type : [User.schema]}
});

module.exports = mongoose.model("Protector", ProtectorSchema);