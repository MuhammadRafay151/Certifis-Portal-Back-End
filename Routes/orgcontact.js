const express = require('express');
const router = express.Router()
const OrgContact = require('../models/orgcontact');
const Org = require('../models/organization');
const { OrgContactValidation } = require("../Validations/validation")
const { validationResult } = require('express-validator')
const { SendMail } = require('../js/nodemailer')



router.post('/', OrgContactValidation, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let result = await Org.findOne({ _id: req.body.OrgID })
    if (result) {

        var cont = new OrgContact({
            name: req.body.name,
            email: result.email,
            orgname: result.name,
            subject: req.body.subject,
            description: req.body.description,
            request_date: Date.now()
        })
        try {
            var r1 = await cont.save()
            await SendMail(
                {
                    from: `${req.body.name} <certifis.cf@gmail.com> `,
                    to: `${result.email}`,
                    subject: `${req.body.subject}`,
                    text: `${req.body.description}`
                }
            )
            res.status(204).send("email sended successfully")

            //res.json(r1)
        }
        catch (err) {
            res.json(err)
        }
    }
    else {
        return res.status(404).send("Organization not found");
    }

})


router.get("/details", async (req, res) => {

    var result = await OrgContact.find().sort({ request_date: "-1" });;
    res.json(result)
})

router.get("/DeleteAll", async (req, res) => {

    var result = await OrgContact.deleteMany({})
    res.json(result)
})



module.exports = router