const express = require("express");
const router = express.Router();
const Protector = require("../../models/protector");

router.post("/", async (req,res,next)=>{
    let pt;
    await Protector.findOne(
        { "Child.SerialNum" : req.body.UID },
        (err, result) => {
            if(err) throw err;
            else pt = result;
        })

    if(pt) {
        await pt.addstamp(req.body);
        res.json(pt);
    }
    else res.json({"message" : "User Not Found"});
});

module.exports = router;