const express = require("express");
const router = express.Router();
const Protector = require("../../models/protector");

router.post("/get", async (req, res, next) => {
    let user = [];
    await Protector.find(
        { PhoneNum : req.body.PhoneNum },
        async (err, result) =>{
            if(err) throw err;
            else {
                await result[0].Child.forEach(i =>{
                  user.push({"Name" : i.Name, "Location" : i.Location, "Visited" : i.Visited});
                  console.log(user);
                })
            }
        })
    console.log(user);
    res.json(user);
});

router.post("/update", (req, res, next) => {
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