const mongoose = require('mongoose')

// game schema
const newGameModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    players: {
        type: [String],
        required: true,
    }
})

module.exports = mongoose.model('game', newGameModel)