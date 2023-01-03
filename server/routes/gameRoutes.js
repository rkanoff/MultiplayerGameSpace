const express = require('express')
const router = express.Router()
const newGameModel = require('../models/gameModel')

router.post('/create', async (req, res) => {
    const { name, type, numPlayers, players } = req.body

    const newGame = new newGameModel({
        name: name,
        type: type,
        numPlayers: numPlayers,
        players: players,
    })

    try {
        const saveNewGame = await newGame.save()
        res.send(saveNewGame)
    } 
    catch (error) {
        res.json(error)
    }
})

router.get('/getAll', async (req, res) => {
    try {
        const games = await newGameModel.find()
        res.send(games)
    } 
    catch (error) {
        res.json(error)
    }
})

module.exports = router