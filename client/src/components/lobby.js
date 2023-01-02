import useTheme from '../hooks/useTheme'
import UserNavBar from './userNavBar'
import Container from 'react-bootstrap/esm/Container'
import Table from 'react-bootstrap/Table'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useState, useEffect } from 'react'

const LobbyPage = () => {
    const { theme } = useTheme()
    const axiosPrivate = useAxiosPrivate()
    const [games, setGames] = useState([])

    const getGames = async () => {
        const res = await axiosPrivate
            .get('http://localhost:8081/games/getAll')
            .then((res) => {
                setGames(res.data)
            })
            .catch((error) =>  console.log(error))
    }

    useEffect(() => {
        getGames()
    })

    return (
        <Container fluid className={`vh-100 ${theme}`}>
            <UserNavBar />
            <Table striped border='true' variant='dark'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Game</th>
                        <th># of Players</th>
                        <th>Join</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game, i) => (
                        <tr key={game._id}>
                            <th>{i+1}</th>
                            <th>{game.name}</th>
                            <th>{game.type}</th>
                            <th>{game.players.length}</th>
                            <th>join</th>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
        </Container>
    )
}

export default LobbyPage