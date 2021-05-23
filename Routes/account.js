const express = require('express');
var router = express.Router()
const user = require('../models/user');
const Auth = require('../Auth/Auth')
const RFT = require('../models/tokens');
const { RegisterValidator, LoginValidator } = require("../Validations/validation")
const { validationResult } = require('express-validator')


router.get("/", async (req, res) => {

   var result = await user.find().sort({ request_date: "-1" });;
   res.json(result)
})

router.get("/rft", async (req, res) => {

   var result = await RFT.find().sort({ request_date: "-1" });;
   res.json(result)
})

router.post('/register', RegisterValidator, async function (req, res) {
   try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      var u1 = new user({
         name: req.body.name,
         email: req.body.email.toLowerCase(),
         password: req.body.password,
      })


      var r1 = await u1.save()
      res.status(200).send("Registered Successfully")
   }
   catch (err) {
      res.status(500).send(err)
   }

});


router.post('/login', LoginValidator, async function (req, res) {

   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }
      var response = await user.findOne({ email: req.body.email, password: req.body.password })
      if (response == null) {
         return res.status(401).json({ message: "Invalid username or password" })
      }

      let token_data = { uid: response._id, email: response.email, name: response.name }

      var token = await Auth.generateAccessToken(token_data)
      console.log(token)
      var RefreshToken = await Auth.generateRefreshToken(token_data)
      console.log(RefreshToken)

      await new RFT({ token: RefreshToken, userid: response._id }).save()
      delete response._doc.password
      response._doc.token = token
      response._doc.RefreshToken = RefreshToken
      return res.json(response)

   } catch (err) {
      res.send(err)
   }

});

router.post('/refresh_token', async function (req, res) {

   try {
      var token = await RFT.findOne({ token: req.body.RefreshToken }).lean();
      if (token == null) {
         res.status(401).json({ message: "No token found" })
      } else {
         try {
            let result = await Auth.authenticateRefreshToken(token.token)
            let u1 = await user.findOne({ _id: result.uid })

            let token_data = { uid: u1._id, email: u1.email, name: u1.name }

            var token = await Auth.generateAccessToken(token_data)
            res.json({ token })

         } catch (err) {
            await RFT.deleteOne({ token: req.body.RefreshToken })
            return res.status(403).send(err)
         }

      }
   } catch (err) {
      res.status(500).send()
   }
});

router.post('/sign_out', async function (req, res) {

   try {
      await RFT.deleteOne({ token: req.body.RefreshToken })
      res.send("signed out")
   }
   catch (err) {
      res.status(500).send()
   }
});


module.exports = router