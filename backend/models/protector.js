const mongoose = require("mongoose");
const User = require("./user");

const ProtectorSchema = new mongoose.Schema({
    Name: {type: String, required: true, trim : true},
    PhoneNum: {type: String, required: true, trim : true},
    Password: {type: String, required: true, trim : true},
    Child : {type : [User.schema]}
});

ProtectorSchema.methods.addstamp = async function(req){
    let stamp_total = 0;
    await this.Child.forEach(user =>{
        if(user.SerialNum == req.UID){
            if(user.Visited[req.ReaderID] == 0){
                if(req.ReaderID == 0) user.StampCnt.hidden++;
                else user.StampCnt.normal++;
                user.Visited.set(req.ReaderID,1);
            }
            stamp_total = user.StampCnt.hidden +user.StampCnt.normal;
        }
    });
    this.save();
    return stamp_total;
}

module.exports = mongoose.model("Protector", ProtectorSchema);