const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const PORT = 8091

const data = {
    name: 'Math is Fun!', 
    maxPlayers: 4, 
    gameAddress: 'http://localhost:3001/', 
    serverAddress: 'http://localhost:8091/'
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
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

module.exports = app