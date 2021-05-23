const express = require('express');
const router = express.Router()
const contact = require('../models/contact');
const { ContactValidation } = require("../Validations/validation")
const { validationResult } = require('express-validator')
const Auth = require('../Auth/Auth')



router.post('/', ContactValidation, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    var cont = new contact({
        name: req.body.name,
        email: req.body.email,
        orgname: req.body.orgname,
        subject: req.body.subject,
        description: req.body.description,
        request_date: Date.now()
    })
    try {
        var r1 = await cont.save()
        res.json(r1)
    }
    catch (err) {
        res.json(err)
    }
})

router.get("/details", Auth.authenticateToken, async (req, res) => {

    var result = await contact.find().sort({ request_date: "-1" });;
    res.json(result)
})

router.get("/DeleteAll", Auth.authenticateToken, async (req, res) => {

    var result = await contact.deleteMany({})
    res.json(result)
})


module.exports = router