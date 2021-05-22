const express = require('express');
const router = express.Router()
const organization = require('../models/organization');
const { OrganizationValidation } = require("../Validations/validation")
const { validationResult } = require('express-validator')



router.post('/', OrganizationValidation, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    var org = new organization({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        iso2: req.body.iso2,
        country_code: req.body.country_code,
        address: req.body.address


    })
    try {
        var r1 = await org.save()
        res.json(r1)
    }
    catch (err) {
        res.json(err)
    }
})

router.put('/:id', OrganizationValidation, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {
        let org = await organization.findOneAndUpdate({ _id: req.params.id }, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            iso2: req.body.iso2,
            country_code: req.body.country_code,
            address: req.body.address
        }, { new: true })
        res.json(org)
    }
    catch (err) {
        res.json(err)
    }
})

router.delete('/:id', async (req, res) => {


    try {
        let org = await organization.findByIdAndDelete({ _id: req.params.id }, {

        })
        res.json(org)
    }
    catch (err) {
        res.json(err)
    }
})

router.get("/", async (req, res) => {

    var result = await organization.find().sort({ request_date: "-1" });;
    res.json(result)
})

router.get("/DeleteAll", async (req, res) => {

    var result = await organization.deleteMany({})
    res.json(result)
})


module.exports = router