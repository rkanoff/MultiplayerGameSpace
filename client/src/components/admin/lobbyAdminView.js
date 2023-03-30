import useTheme from '../../context/themeProvider'
import UserNavBar from '../user/userNavBar'
import Container from 'react-bootstrap/esm/Container'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useState, useEffect } from 'react'

const AdminLobbyPage = () => {
    const { theme } = useTheme()
    const axiosPrivate = useAxiosPrivate()
    const [games, setGames] = useState([])

    const getGames = async () => {
        await axiosPrivate
            .get('http://localhost:8081/games/getAll')
            .then((res) => {
                setGames(res.data)
            })
            .catch((error) =>  console.log(error))
    }

    const handleRemove = async (gameId) => {
        await axiosPrivate.post('http://localhost:8081/admin/removeGame', { gameId })
        getGames()
    }

    useEffect(() => {
        getGames()
    },[])

    return (
        <Container fluid className={`custom-h90 ${theme}`}>
            <Table striped border='true' variant={theme}>
                <thead>
                    <tr>
                        <th>ID</th>
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
                        <tr key={game._id} >
                            <th>{game._id}</th>
                            <th>{game.name}</th>
                            <th>{game.type}</th>
                            <th>{game.players.length}/{game.numPlayers}</th>
                            <th>
                                <Button value={game._id} className='custom-btn' onClick={e => handleRemove(e.target.value)} > 
                                    Remove
                                </Button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
        </Container>
    )
}

export default AdminLobbyPage