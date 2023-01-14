const { Server } = require('socket.io')
const { createServer } = require('http')
const { isNullOrUndefined } = require('util')
const httpServer = createServer()
const PORT = 8082

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true
    }
})  

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('disconnect', () => {
        console.log('a user disconnected')
        socket.removeAllListeners()
    })

    socket.onAny((eventName, ...args) => {
        io.emit(eventName, args)
    })
})

httpServer.listen(PORT, () => {
    console.log(`http server listening on port ${PORT}`)
})
