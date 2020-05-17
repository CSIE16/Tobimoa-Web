const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    Name: {type: String, required: true , trim : true},
    SerialNum: {type: String, required: true},
    Location: {
        latitude: {type: String , default : 0},
        longitude: {type: String, default : 0}
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