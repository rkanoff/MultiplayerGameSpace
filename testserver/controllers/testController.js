const asyncHandler = require('express-async-handler')
const NodeCache = require('node-cache')

const myCache = new NodeCache({})

const receiveGame = asyncHandler( async(req, res) => {
    const { name } = req.body
    console.log(name)
})

const receivePlayer = asyncHandler( async(req, res) => {
    const { username, gameId } = req.body
    console.log(username)
})

const updateCache = asyncHandler(async (req, res) => {
    const { gameId } = req.body

    const counter = myCache.get(gameId)
    if (!counter)
        myCache.set(gameId, 0)

    const counter2 = myCache.set(gameId, counter+1)
    res.send(JSON.stringify(counter2))
})

const getCache = asyncHandler(async (req, res) => {
    const { gameId } = req.query

    console.log(gameId)

    const counter = myCache.get(gameId)
    if (!counter) {
        myCache.set(gameId, 0)
    }
    const counter2 = myCache.get(gameId)
    console.log(counter2)
    res.send(JSON.stringify(counter2))
})

module.exports = {
    receiveGame,
    receivePlayer,
    updateCache,
    getCache
}