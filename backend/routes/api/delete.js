const express = require("express")
const router = express.Router()
const Protector = require("../../models/protector")

router.delete('/protector', (req,res)=>{
    console.log(req.body);
    Protector.deleteOne(
        {PhoneNum: req.body.pro.PhoneNum},
        (err, result)=>{
            if(err) throw err
            else res.send(true)
        }
    )
})

module.exports = router