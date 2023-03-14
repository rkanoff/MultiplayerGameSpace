import { useState, useEffect } from 'react'
import MainCard from './components/MainCard'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [player1, setPlayer1] = useState('Player 1')
  const [player2, setPlayer2] = useState('Player 2')

  return (
      <div class='container-fluid h-100 bg-dark '>

        <div class='row h-15 align-items-center justify-content-center'>
          <Header player1={player1} player2={player2} />
        </div>

        <div class='row h-70 align-items-center'>
          <div class='col h-100'>
            <MainCard playerName={player1} />
          </div>
          <div class='col h-100'>
            <MainCard playerName={player2} />
          </div>
        </div>

        <div class='row h-15 align-items-center justify-content-center'>
          <Footer />
        </div>

      </div>
  )
}

export default App
