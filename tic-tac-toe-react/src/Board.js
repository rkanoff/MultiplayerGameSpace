// Importing the CSS for the board
import "./css/board.css";

// Importing the useState hook, useEffect hook and useRef hook
import { useState, useEffect, useRef } from "react";
import { io } from 'socket.io-client'

import axios from 'axios'

const Board = ({ reset, setReset, winner, setWinner, setPlayer1, setPlayer2}) => {

	const [connection, setConnection] = useState()

	const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const name = urlParams.get('username')
    const gameId = urlParams.get('gameId')

	useEffect(() => {
        const socket = io('localhost:8082', { auth: { gameId: gameId }})
        setConnection(socket)

		socket.on('draw', (message) => {
			receiveDraw(message)
        })

		socket.on('playerJoined', (message) => {
			getPlayerList()
		})

		socket.emit('playerJoined', '')
		getPlayerList()
	}, [])

	// determine player names and positions
	const getPlayerList = async () => {
		await axios
				.get('http://localhost:8081/games/playerList', { params: { gameId: gameId }})
				.then((res) => {
					if (name===res.data[0]) {
					  setPlayer1(name)
					   if (res.data[1]) setPlay(0)
					}
					else setPlayer1(res.data[0])
					if (name===res.data[1]) {
					  setPlayer2(name)
					  setPlay(1)
					}
					else setPlayer2(res.data[1])
				})
				.catch((error) => console.log(error))
	  }

	// Creating a turn state, which indicates the current turn
	const [turn, setTurn] = useState();

	// Creating a data state, which contains the
	// current picture of the board
	const [data, setData] = useState(['', '', '', '', '',
		'', '', '', ''])

	// Creating a reference for the board
	const boardRef = useRef(null);

	const [play, setPlay] = useState('')

	// Function to draw on the board
	const draw = (index) => {
		// Draws only if the position is not taken
		// and winner is not decided yet
		if (data[index - 1] === '' && winner === '' && play===turn) {

			// Draws X if it's player 1's turn else draws O
			const current = turn === 0 ? "X" : "O"

			//setPlay(turn)

			connection.emit('draw', { message: { player: current, index: index }})
		}
	}

	const receiveDraw = (message) => {
		const index = message[0].message.index-1
		const player = message[0].message.player
		const cells = boardRef.current.children

		cells[index].innerText = player
		const newData = [
						cells[0].innerText,
						cells[1].innerText,
						cells[2].innerText,
						cells[3].innerText,
						cells[4].innerText,
						cells[5].innerText,
						cells[6].innerText,
						cells[7].innerText,
						cells[8].innerText
						]
		setData(newData)
		setTurn(player === 'X' ? 1 : 0)
		
	}

	// UseEffect hook used to reset the board whenever
	// a winner is decided
	useEffect(() => {
		// Clearing the data state
		setData(['', '', '', '', '', '', '', '', '']);
	
		// Getting all the children(cells) of the board
		const cells = boardRef.current.children

		// Clearing out the board
		for (let i = 0; i < 9; i++) {
			cells[i].innerText = '';
		}

		// Resetting the turn to player 0
		setTurn(0);

		// Resetting the winner
		setWinner('');
		setReset(false);
		resetGame()
	}, [reset, setReset, setWinner])

	const resetGame = async () => {
		await axios.post('http://localhost:8092/test/resetGame', { gameId: gameId})
	}

	// useEffect hook used to check for a winner
	useEffect(() => {

		// Checks for the win condition in rows
		const checkRow = () => {
			let ans = false;
			for (let i = 0; i < 9; i += 3) {
				ans |= (data[i] === data[i + 1] &&
				data[i] === data[i + 2] &&
				data[i] !== '')
			}
			return ans;
		}

		// Checks for the win condition in cols
		const checkCol = () => {
			let ans = false;
			for (let i = 0; i < 3; i++) {
				ans |= (data[i] === data[i + 3] &&
				data[i] === data[i + 6] &&
				data[i] !== '')
			}
			return ans;
		}

		// Checks for the win condition in diagonals
		const checkDiagonal = () => {
			return ((data[0] === data[4] &&
			data[0] === data[8] && data[0] !== '') ||
			(data[2] === data[4] && data[2] === data[6] &&
			data[2] !== ''));
		}

		// Checks if at all a win condition is present
		const checkWin = () => {
			return (checkRow() || checkCol() || checkDiagonal());
		}

		// Checks for a tie
		const checkTie = () => {
			let count = 0;
			data.forEach((cell) => {
				if (cell !== '') {
					count++;
				}
			})
			return count === 9;
		}

		// Setting the winner in case of a win
		if (checkWin()) {
			setWinner(turn === 0 ? "Player 2 Wins!" :
			"Player 1 Wins!");
			
		} else if (checkTie()) {
			// Setting the winner to tie in case of a tie
			setWinner("It's a Tie!");
		}

	})

	return (
		<div ref={boardRef} className="board">
			<div className="input input-1"
				onClick={(e) => draw(1)}></div>
			<div className="input input-2"
				onClick={(e) => draw(2)}></div>
			<div className="input input-3"
				onClick={(e) => draw(3)}></div>
			<div className="input input-4"
				onClick={(e) => draw(4)}></div>
			<div className="input input-5"
				onClick={(e) => draw(5)}></div>
			<div className="input input-6"
				onClick={(e) => draw(6)}></div>
			<div className="input input-7"
				onClick={(e) => draw(7)}></div>
			<div className="input input-8"
				onClick={(e) => draw(8)}></div>
			<div className="input input-9"
				onClick={(e) => draw(9)}></div>
		</div>
	)
}

export default Board;
