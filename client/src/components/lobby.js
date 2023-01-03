import useTheme from '../hooks/useTheme'
import UserNavBar from './userNavBar'
import Container from 'react-bootstrap/esm/Container'
import Table from 'react-bootstrap/Table'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LobbyPage = () => {
    const { theme } = useTheme()
    const axiosPrivate = useAxiosPrivate()
    const [games, setGames] = useState([])
    const navigate = useNavigate()

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
    }, [])

    return (
        <Container fluid className={`vh-100 ${theme}`}>
            <UserNavBar />
            <Table striped border='true' variant={theme}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Game</th>
                        <th># of Players</th>
                        <th>Joinable?</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game, i) => (
                        <tr key={game._id}>
                            <th>{i+1}</th>
                            <th>{game.name}</th>
                            <th>{game.type}</th>
                            <th>{game.players.length}/{game.numPlayers}</th>
                            <th>Yes</th>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
        </Container>
    )
}

export default LobbyPage