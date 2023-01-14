require('dotenv').config()
const asyncHandler = require('express-async-handler')
const newUserModel = require('../models/userModel')
const newGameModel = require('../models/gameModel')

const createAdmin = asyncHandler(async (req, res) => {
    const { key, userId } = req.body

    if (!key || key!=process.env.ADMIN_KEY) return (res.status.send({ message: 'Invalid key'}))
    
    newUserModel.findByIdAndUpdate(userId, { isAdmin: true }, 
        function (err) {
            if (err) 
                res.status(400).send({ message: 'Error creating new admin'})
            else 
                res.json({ message: 'Admin successfully created'})
        })
    })

const removeGame = asyncHandler(async (req, res) => {
    const { gameId } = req.body

    newGameModel.findByIdAndDelete(gameId,
        function(err) {
            if (err)
                res.status(400).send({ message: 'Error removing game'})
            else
                res.json({ message: `Game '${gameId}' successfully removed` })
        })
})

const getUsers = asyncHandler(async (req, res) => {
    const users = await newUserModel.find()

    if (users)
        res.send(users)
    else
        res.status(400).send({ message: 'Error retrieving user list' })
})

const removeUser = asyncHandler(async (req, res) => {
    const { userId } = req.body

    newUserModel.findByIdAndDelete(userId,
        function(err) {
            if (err)
                res.status(400).send({ message: 'Error removing user'})
            else
                res.json({ message: `User '${userId}' successfully removed` })
        })
})

module.exports = {
    createAdmin,
    removeGame,
    getUsers,
    removeUser
}