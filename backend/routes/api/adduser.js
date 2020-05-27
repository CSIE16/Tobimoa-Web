const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../../models/user");
const Protector = require("../../models/protector");

router.post('/', (req, res, next) => {
    console.log(req.body);
    Protector.find({PhoneNum: req.body.PhoneNum})
        .exec()
            .then(pt => {
                if (pt.length >= 1) {
                    pt[0].Name = req.body.Name
                    pt[0].PhoneNum = req.body.PhoneNum
                    pt[0].Password = req.body.Password
                    for(let i = 0; i < pt[0].Child.length; i++){
                        pt[0].Child[i].Name = req.body.player[i].Name
                        pt[0].Child[i].SerialNum = req.body.player[i].SerialNum
                    }
                    pt[0]
                        .save()
                        .then(result=>{
                            console.log(result)
                            res.send(true)
                        })
                        .catch(err => console.log(err))
                }
                else {
                    const protector = new Protector({
                        _id : new mongoose.Types.ObjectId(),
                        Name: req.body.Name,
                        PhoneNum: req.body.PhoneNum,
                        Password: req.body.Password,
                    });

                    for (let i in req.body.player) {
                        const user = new User({
                            _id : new mongoose.Types.ObjectId(),
                            Name: req.body.player[i].Name,
                            SerialNum: req.body.player[i].SerialNum
                        });
                        protector.Child.push(user);
                    }
                    protector
                        .save()
                        .then(result => {
                            console.log(result);
                            res.send(true);
                        })
                        .catch(err => console.log(err));
                }
            })
});

module.exports = router;