const express = require("express")
const router = express.Router()
const Protector = require("../../models/protector")

router.delete('/protector', (req,res)=>{
    console.log(req.body);
    // Protector.deleteOne(
    //     {PhoneNum: req.body.pro.PhoneNum},
    //     (err, result)=>{
    //         if(err) throw err
    //         else res.send(true)
    //     }
    // )
    const data = service.deleteOne(params);
    if(data) {
        return res.state(200).send('good')
    } else {
        return res.state(500).send('BAD');
    }
})

router.delete('/all', (req,res)=>{
    Protector.deleteMany(
        {},
        (err,result)=>{
            if(err) throw err
            else res.send(true)
        }
    )
})

module.exports = router