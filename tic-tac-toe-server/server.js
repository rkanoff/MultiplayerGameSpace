const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const PORT = 8092

const data = {
    name: 'Tic-Tac-Toe', 
    maxPlayers: 2, 
    gameAddress: 'http://localhost:3002/', 
    serverAddress: 'http://localhost:8092/'
}

const register = async () => {
    try {
        await axios.post('http://localhost:8081/games/registerApp', data)
    } 
    catch (error) {
        register()
    }
}
register()

app.use(cors({credentials: true, origin: true}))
app.use(express.json())
app.use('/test', require('./routes/testRoutes'))
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

module.exports = app