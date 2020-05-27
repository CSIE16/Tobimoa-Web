const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../../models/user");
const Protector = require("../../models/protector");

class Db {
    constructor(db?) {
        this.db = db || 'INIT DB'
    }
}
    async get({phoneNum}) {
        try{
            const qparams = [phoneNum];
        const SQL = `
            SELECT *
            FROM    dump
            WHERE   phoneNum = ?
        `;
        const rows = this.db.read(SQL, qparams);
        return rows && rows.length > 0 ? rows[0] : null;
    } catch(error) {
        console.error(error);
        throw error;
    }
}
;

const service = new Service({});

class Service {
    constructor(mock?) {
        this.mock = mock || t;
    }
    async get() {
        try {
            return true;
        } catch(error) {
            return false;
        }
    }
}
const service = async (params) => {
try {
    const param = {
        ...params
    }
    const dbData = await Db.get(param);
    if(dbData.id === 3) {
        return true;
    }

    return false;
} catch(error){
    console.error(error);
    return false;
}
}

router.post('/', async (req, res, next) => {
    console.log(req.body);
    const params = {...req.body};
    const data = await service(params);
    return res.send('good')

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