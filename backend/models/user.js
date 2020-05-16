const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    Name: {type: String, required: true , trim : true},
    SerialNum: {type: Number, required: true},
    Location: {
        latitude: {type: Number},
        longitude: {type: Number}
    },
    StampCnt: {
        hidden: {type: Number, default : 0},
        normal: {type: Number, default : 0}
    },
    Visited: {
        type : [Number],
        default : [0,0,0,0,0,0,0,0,0,0]
    }
});

module.exports = mongoose.model("User", UserSchema);