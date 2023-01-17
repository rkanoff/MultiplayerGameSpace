const { Server } = require('socket.io')
const { createServer } = require('http')
const httpServer = createServer()
const PORT = 8082

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
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
        console.log('a user disconnected')
        socket.removeAllListeners()
    })

    socket.onAny((eventName, ...args) => {
        io.to(socket.gameId).emit(eventName, args)
    })
})

httpServer.listen(PORT, () => {
    console.log(`http server listening on port ${PORT}`)
})
