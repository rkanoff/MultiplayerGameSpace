import { useState, useEffect } from 'react'
import Card1 from './components/Card1'
import Card2 from './components/Card2'
import Header from './components/Header'
import Footer from './components/Footer'
import axios from 'axios'
import { io } from 'socket.io-client'
import './App.css'

function App() {

  const [start, setStart] = useState(false)
  const [reset, setReset] = useState(false)

  // create socket and add listeners
  const [connection, setConnection] = useState()
  useEffect(() => {
    const socket = io('localhost:8082', { auth: { gameId: gameId }})
    setConnection(socket)
    socket.emit('playerJoined')

    socket.on('playerJoined', () => {
      getPlayerList()
    })
  },[])

  // pull player and game information from urlparams
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const name = urlParams.get('username')
  const gameId = urlParams.get('gameId')

  // intialize player values
  const [player, setPlayer] = useState(true)
  const [player1, setPlayer1] = useState('')
  const [player2, setPlayer2] = useState('')

  // determine player names and positions
  const getPlayerList = async () => {
    await axios
            .get('http://localhost:8081/games/playerList', { params: { gameId: gameId }})
            .then((res) => {
                if (name===res.data[0]) {
                  setPlayer1(name)
                  setPlayer(true)
                }
                else setPlayer1(res.data[0])
                if (name===res.data[1]) {
                  setPlayer2(name)
                  setPlayer(false)
                }
                else setPlayer2(res.data[1])
            })
            .catch((error) => console.log(error))
  }

  useEffect(() => {
    getPlayerList()
  },[])

  return (
      <div class='container-fluid h-100 bg-dark '>

        <div class='row h-15 align-items-center justify-content-center'>
          <Header player1={player1} player2={player2} start={start} setStart={setStart} />
        </div>

        <div class='row h-70 align-items-center'>
          <div class='col h-100'>
            <Card1 player={player} start={start} connection={connection} />
          </div>
          <div class='col h-100'>
            <Card2 player={player} start={start} connection={connection} />
          </div>
        </div>

        <div class='row h-15 align-items-center justify-content-center'>
          <Footer player={player} connection={connection} setStart={setStart} />
        </div>

      </div>
  )
}

export default App
