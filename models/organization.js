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
    phone: {
        type: String,
        require: true
    },
    country_code: {
        type: String,
        require: true
    },
    iso2: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
})

module.exports = mongoose.model("Organization", Organization)