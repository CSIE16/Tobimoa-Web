const express = require("express");
const router = express.Router();
const Protector = require("../../models/protector");

router.post("/add", async (req, res, next) => {
    let pt;
    await Protector.findOne(
        {"Child.SerialNum": req.body.UID},
        (err, result) => {
            if (err) throw err;
            else pt = result;
        })

    if (pt) {
        let ret = await pt.addstamp(req.body);
        res.json({"StampCnt": ret});
    } else res.json({"message": "User Not Found"});
});

router.post("/get", async (req, res, next) => {
    let user = [];
    await Protector.find(
        {PhoneNum: req.body.PhoneNum},
        async (err, result) => {
            if (err) throw err;
            else {
                await result[0].Child.forEach(i => {
                    user.push({"Name": i.Name, "StampCnt": i.StampCnt});
                })
            }
        })
    res.json(user);
})

module.exports = router;