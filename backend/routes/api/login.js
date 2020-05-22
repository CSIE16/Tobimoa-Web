const express = require("express");
const router = express.Router();
const Protector = require("../../models/protector");

router.post("/", async (req, res, next) => {
    await Protector.findOne(
        {PhoneNum: req.body.PhoneNum, Password : req.body.Password},
        (err, result) => {
            if (err) throw err;
            return res.json(result ? result : {error : "Check your PhoneNumber or Password"});
        })
})

module.exports = router;