const express = require("express");
const router = express.Router();
const Protector = require("../../models/protector");

router.post("/", (req, res, next) => {
    Protector.updateOne(
        { "Child.SerialNum" : req.body.UID },
        { $set : { "Child.$.Location" : req.body.Location }},
        (err, result) =>{
            if(err) throw err;
            else {
                console.log(result);
                res.json(result);
            }
        })
});

module.exports = router;