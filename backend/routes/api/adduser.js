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
                if (pt.length >= 1)
                    res.send('<script type="text/javascript">alert("이미 존재하는 아이디.");window.location="/user"; </script>');
                else {
                    const protector = new Protector({
                        _id : new mongoose.Types.ObjectId(),
                        Name: req.body.name,
                        PhoneNum: req.body.phoneNum,
                        Password: req.body.password,
                    });

                    for (let i in req.body.player) {
                        console.log("player : " + i + ' ' +  req.body.player[i].name + ' ' + req.body.player[i].serial);
                        const user = new User({
                            _id : new mongoose.Types.ObjectId(),
                            Name: req.body.player[i].name,
                            SerialNum: parseInt(req.body.player[i].serial)
                        });
                        console.log(user);
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                            })
                            .catch(err => console.log(err));
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