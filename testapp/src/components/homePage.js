import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

const HomePage = () => {
    const [counter, setCounter] = useState(-1)

    useEffect(() => {
        
    })

    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const name = urlParams.get('username')
    const gameId = urlParams.get('gameId')


    const getCounter = async () => {
        await axios.get
            ('http://localhost:8091/test/getCache', { params: { gameId: gameId }})
            .then((res) => {
                setCounter(res.data)
                console.log(res.data)
            })
            .catch((error) => console.log(error))
    }

    const iterateCounter = async () => {
        await axios.post('http://localhost:8091/test/setCache', { gameId: gameId})
    }

    const poll = async () => {
        getCounter()
        await new Promise(r => setTimeout(r, 5000))
        console.log('check')
        poll()
    }
    poll()

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