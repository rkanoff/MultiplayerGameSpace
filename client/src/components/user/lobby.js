import useTheme from '../../context/themeProvider'
import UserNavBar from './userNavBar'
import Container from 'react-bootstrap/esm/Container'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../context/authProvider'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LobbyPage = () => {
    const { theme } = useTheme()
    const axiosPrivate = useAxiosPrivate()
    const [games, setGames] = useState([])
    const { auth, setAuth } = useAuth()
    const navigate = useNavigate()

    const getGames = async () => {
        await axiosPrivate
            .get('http://localhost:8081/games/getAll')
            .then((res) => {
                setGames(res.data)
            })
            .catch((error) => console.log(error))
    }

    const joinGame = async (gameId) => {
        await axiosPrivate.post('http://localhost:8081/games/addPlayer', { username: auth.username, gameId: gameId })
        setAuth(prev => {
            return {...prev, connected: true, gameId: gameId}
        })
        navigate('/gameroom')
    }

    useEffect(() => {
        getGames()
    },[])

    return (
        <Container fluid className={`vh-100 ${theme}`}>
            <UserNavBar/>
            <Table striped bordered variant={theme} style={{borderRadius: ''}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Game</th>
                        <th># of Players</th>
                        <th>
                            <Button className='custom-btn' onClick={getGames} > 
                                Refresh
                            </Button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game, i) => (
                        <tr key={game._id}>
                            <th>{game.name}</th>
                            <th>{game.type}</th>
                            <th>{game.players.length}/{game.numPlayers}</th>
                            <th>
                                <Button className='custom-btn' onClick={() => joinGame(game._id)} > 
                                    Join
                                </Button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
        </Container>
    )
}

export default LobbyPage