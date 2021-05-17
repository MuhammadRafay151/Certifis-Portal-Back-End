const express = require('express');
const router = express.Router()
const contact = require('../models/contact');
var pagination = require('./../js/pagination');
const { ContactValidation } = require("../Validations/validation")
const { validationResult } = require('express-validator')



router.post('/', ContactValidation,async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
    }

    var cont = new contact({
        name: req.body.name,
        email: req.body.email,
        orgname:req.body.orgname,
        subject:req.body.subject,
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

router.get("/", async (req, res) => {

    var perpage = 5
    var pageno = req.query.pageno
    if (isNaN(parseInt(pageno))) { pageno = 1 }
    var result = await contact.find().sort({ request_date: "-1" }).skip(pagination.Skip(pageno, perpage)).limit(perpage);;
    var total = await contact.find().countDocuments();
    result = { "list": result, totalcount: total }
    res.json(result)
})

router.get("/details", async (req, res) => {

    var result = await contact.find().sort({ request_date: "-1" });;
    res.json(result)
})

router.get("/detail", async (req, res) => {

    var result = await contact.deleteMany({})
    res.json(result)
})


module.exports = router