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
    const { gameId, username, board } = req.body

    const game = myCache.get(gameId)
    if (!game) {
        myCache.set(gameId, {
            player1: username, 
            player2: '', 
            board: ['','','','','','','','','']
        })
        return;
    }

    if (game.player2 === '') {
        myCache.set({...prev, player2: username})
        return;
    }

    if (game.player2 !== '') {
        myCache.set({...prev, board: board})
    }

})

const getCache = asyncHandler(async (req, res) => {
    const { gameId, username } = req.query

    var game = myCache.get(gameId)
    if (!game) {
        game = myCache.set(gameId, {
            player1: username, 
            player2: '',
            board: ['','','','','','','','','']
        })
    }

    if (game.player1 !== username && game.player2 === '') {
        const player1 = game.player1
        const board = game.board
        game = myCache.set(gameId, {
            player1: player1,
            player2: username,
            board: board
        })
    }

    res.send(myCache.get(gameId))
})

const removePlayer = asyncHandler((req, res) => {
    const { gameId, username } = req.body

    const game = myCache.get(gameId)
    console.log('test')
    if (game.player1 === username) {
        myCache.set(gameId, {
            player1: '',
            player2: game.player2,
            board: game.board
        })
    }
    if (game.player2 === username) {
        myCache.set(gameId, {
            player1: game.player1,
            player2: '',
            board: game.board
        })
    }
})

const resetGame = asyncHandler((req, res) => {
    const { gameId } = req.body

    myCache.set(gameId, {
        player1: '',
        player2: '',
        board: ['','','','','','','','','']
    })
})

module.exports = {
    receiveGame,
    receivePlayer,
    updateCache,
    getCache,
    removePlayer,
    resetGame
}