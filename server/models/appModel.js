const mongoose = require('mongoose')

const newAppModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    maxPlayers: {
        type: Number,
        required: true,
    },
    gameAddress: {
        type: String,
        required: true,
    },
    serverAddress: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('app', newAppModel)