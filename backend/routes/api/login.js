const express = require("express");
const router = express.Router();
const Protector = require("../../models/protector");

router.post("/", async (req, res, next) => {
    await Protector.findOne(
        {PhoneNum: req.body.PhoneNum, Password : req.body.Password},
        (err, result) => {
            if (err) throw err;
            else if(result)
                return res.json({Name: result.Name, PhoneNum: result.PhoneNum, Password : result.Password});
        })
    res.json({err : "Check your PhoneNumber or Password"});
})

module.exports = router;