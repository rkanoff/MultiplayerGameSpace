import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { io } from 'socket.io-client'

const HomePage = () => {
    const [counter, setCounter] = useState(-1)
    const [connection, setConnection] = useState()

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const name = urlParams.get('username')
    const gameId = urlParams.get('gameId')

    useEffect(() => {
        const socket = io('localhost:8082', { auth: { gameId: gameId }})
        setConnection(socket)

        socket.on('counter', (message) => {
            getCounter()
        })

        getCounter()
    }, [])

    const getCounter = async () => {
        await axios.get
            ('http://localhost:8091/test/getCache', { params: { gameId: gameId }})
            .then((res) => {
                setCounter(res.data)
            })
            .catch((error) => console.log(error))
    }

    const iterateCounter = async () => {
        await axios.post('http://localhost:8091/test/setCache', { gameId: gameId})
        connection.emit('counter', counter+1)
    }

    return (
        <Container>
            <h1>username={name}</h1>
            <h1>gameId={gameId}</h1>
            <h1>counter={counter}</h1>
            <Button type='primary' onClick={iterateCounter}>
                Iterate Counter
            </Button>
            <Button type='primary' onClick={getCounter}>
                Get Counter
            </Button>
        </Container>
    )
}

export default HomePage