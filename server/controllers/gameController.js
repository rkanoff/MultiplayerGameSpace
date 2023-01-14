const newGameModel = require('../models/gameModel')
const { newGameValidation } = require ('../models/gameValidation')
const asyncHandler = require('express-async-handler')

// create new game
const create = asyncHandler(async (req, res) => {
    // validate game information
    const { error } = newGameValidation(req.body)
    if (error) return res.status(400).send({ message: error.errors[0].message })
    const { name, type, numPlayers, players } = req.body

    const nameCheck = await newGameModel.findOne({name: name})
    if (nameCheck) return res.status(409).send({ message: 'Name already in use, choose another' })

    const newGame = new newGameModel({
        name: name,
        type: type,
        numPlayers: numPlayers,
        players: players,
    })

    const saveNewGame = await newGame.save()

    if (saveNewGame)
        res.send(saveNewGame)
    else
        res.status.send({ message: 'Error creating new game' })
})

// return list of all games
const getAll = asyncHandler(async (req, res) => {
    const games = await newGameModel.find()
     
    if (games)
        res.send(games)
    else
        res.status(400).send({ message: 'Error retrieving game list' })
})

module.exports = {
    create,
    getAll
}