const { Server } = require('socket.io')
const { createServer } = require('http')
const httpServer = createServer()
const PORT = 8082
const whiteList = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002']

const io = new Server(httpServer, {
    cors: {
        origin: whiteList,
        credentials: true
    }
})  

io.use((socket, next) => {
    socket.gameId = socket.handshake.auth.gameId
    next()
})

io.on('connection', (socket) => {
    socket.join(socket.gameId)

    socket.on('disconnect', () => {
        socket.removeAllListeners()
    })

    socket.onAny((eventName, ...args) => {
        io.to(socket.gameId).emit(eventName, args)
    })
})

httpServer.listen(PORT, () => {
    console.log(`http server listening on port ${PORT}`)
})
