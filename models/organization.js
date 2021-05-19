const mongoose = require('mongoose')
const Organization = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("Organization", Organization)