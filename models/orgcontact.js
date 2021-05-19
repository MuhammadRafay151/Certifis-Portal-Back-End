const mongoose = require('mongoose')
const OrgContact = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    orgname: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    request_date: {
        type: Date,
        required: true
    },

})

module.exports = mongoose.model("OrgContact", OrgContact)