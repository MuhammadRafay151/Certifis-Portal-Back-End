const mongoose = require('mongoose')
const Contact = mongoose.Schema({
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
    email: {
        type: String,
        unique: true,
        index: true,
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

module.exports = mongoose.model("Contact", Contact)