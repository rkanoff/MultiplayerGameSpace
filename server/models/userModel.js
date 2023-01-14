const mongoose = require('mongoose')

//  user schema
const newUserModel = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user', newUserModel)