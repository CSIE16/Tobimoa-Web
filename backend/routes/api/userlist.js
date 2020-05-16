const express = require("express");
const router = express.Router();
const Protector = require("../../models/protector");

router.get("/", (req, res, next) => {
    Protector.find({})
        .exec()
            .then(pt => res.send(pt))
            .catch(err => console.log(err))
});

module.exports = router;