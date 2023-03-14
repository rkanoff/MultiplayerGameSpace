const newGameModel = require('../models/gameModel')
const newAppModel = require('../models/appModel')
const { newGameValidation } = require ('../models/gameValidation')
const asyncHandler = require('express-async-handler')
const axios = require('axios')

// create new game
const create = asyncHandler( async (req, res) => {
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

    if (saveNewGame) {
        res.send(saveNewGame)
    }
    else
        res.status.send({ message: 'Error creating new game' })
})

// return list of all games
const getAll = asyncHandler( async (req, res) => {
    const games = await newGameModel.find()
     
    if (games)
        res.send(games)
    else
        res.status(400).send({ message: 'Error retrieving game list' })
})

// add player to game
const addPlayer = asyncHandler( async(req, res) => {
    const { username, gameId } = req.body

    newGameModel.findByIdAndUpdate(gameId, {$push: {players: username}},
        function (error) {
            if (error)
                res.status(400).send({ message: 'Error joining game'})
            else {
                res.json({ message: 'Game joined'})
            }
        })
})

// remove player from game
const removePlayer = asyncHandler( async(req, res) => {
    const { username, gameId } = req.body

    newGameModel.findByIdAndUpdate(gameId, {$pull: {players: username}},
        function (error) {
            if (error)
                res.status(400).send({ message: error.message})
            else 
                res.json({ message: 'Game left'})
        })
})

// return list of players in game
const playerList = asyncHandler( async(req, res) => {
    const { gameId } = req.query

    const game = await newGameModel.findById(gameId)

    if (!game) res.status(400).send({ message: 'Game not found'})
    else res.json(game.players)
})

// Add external app to list
const registerApp = asyncHandler(async(req, res) => {
    const { name, maxPlayers, gameAddress, serverAddress } = req.body
    
    const checkApp = await newAppModel.findOne({ name: name})
    if (checkApp) return res.send({ message: 'App already registered.' })

    const newApp = newAppModel({
        name: name,
        maxPlayers: maxPlayers,
        gameAddress: gameAddress,
        serverAddress: serverAddress
    })

    const saveNewApp = await newApp.save()

    if (saveNewApp)
        res.send(saveNewApp)
    else
        res.status.send({ message: 'Error registering new app.' })
})

const getAppList = asyncHandler(async(req, res) => {
    const apps = await newAppModel.find()
     
    if (apps)
        res.send(apps)
    else
        res.status(400).send({ message: 'Error retrieving game list' })
})

const getAppAddress = asyncHandler(async(req, res) => {
    const { gameId } = req.query

    const game = await newGameModel.findById(gameId)
    if (!game)
        res.status(400).send({ message: 'Error retrieving gameId' })

    const app = await newAppModel.find({ name: game.type })
    if (app) {
        res.send(app)
    } 
    else
        res.status(400).send({ message: 'Error retrieving game list' })
})

module.exports = {
    create,
    getAll,
    addPlayer,
    removePlayer,
    playerList,
    registerApp,
    getAppList,
    getAppAddress
}