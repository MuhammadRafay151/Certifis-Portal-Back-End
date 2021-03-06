const express = require('express');
const app = express();
const server = require('http').createServer(app);
const config = require('config');
const contact = require('./Routes/contact');
const orgcontact = require('./Routes/orgcontact');
const organization = require('./Routes/organization');
const account = require("./Routes/account");

var cors = require('cors')

require('dotenv').config();
const mongoose = require('mongoose');

const port = process.env.PORT || "8000";

app.use(express.json());
app.use(cors())

app.use("/api/contact", contact)
app.use("/api/organization", organization)
app.use("/api/orgcontact", orgcontact)
app.use("/api/account", account)






app.get("/", (req, res) => {
  res.status(200).send("Welcome User <br/>Your Application is up and runnig <br/>Enjoy!");
});


mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(config.get('database.url'), { useUnifiedTopology: true, useNewUrlParser: true }, () => { console.log("Connected to db") })
server.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`)
  console.log("socket server connected")
});

