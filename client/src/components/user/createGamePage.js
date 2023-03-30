import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useTheme from '../../context/themeProvider'
import UserNavBar from './userNavBar'
import useAuth from '../../context/authProvider'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { newGameValidation } from '../../models/gameValidation'

const CreateGamePage = () => {
    const url = "http://localhost:8081/games/create"
    const navigate = useNavigate()
    const { auth } = useAuth()
    const [form, setForm] = useState({name: "", type: "", numPlayers: 2, players: []})
    const { theme } = useTheme()
    const axiosPrivate = useAxiosPrivate()  
    const [errors, setErrors] = useState({name: null})
    const [games, setGames] = useState([])

    useEffect(() => {
        getGames()
    },[])

    const getGames = async () => {
        await axiosPrivate
            .get('http://localhost:8081/games/getAppList')
            .then((res) => {
                setGames(res.data)
                setForm({...form, type: res.data[0].name })
            })
            .catch((error) => console.log(error))
    }

    const updateForm = ({ target : input }) => {
        if (input.id === 'numPlayers')    
            setForm({ ...form, [input.id] : parseInt(input.value) })
        else
            setForm({ ...form, [input.id] : input.value })
        setErrors({ name: null })
    }   

    const updateErrors = (error) => {
        const newErrors = {[error[0].path]: error[0].message}
        console.log(newErrors)
        setErrors(newErrors)
    }

    const handleCreate = async (event) => {
        event.preventDefault()
        const { error } = newGameValidation(form)
        if (error) updateErrors(Object.values(error.issues))
        if(!error)
        {
            try {
                await axiosPrivate.post(url, form)
                navigate("/lobby")
            }
            catch (error) {
                window.alert(error.response.data.message)
            }
        }
    }

    const handleCancel = async (event) => {
        event.preventDefault()
        navigate("/lobby")
    }

    const Images = () => {
        if (form.type==='Math is Fun!')
            return (<img rel='preload' src={require('../../Daco.png')} className='w-100 rounded mx-auto d-block' alt='math' />)

        if (form.type==='Chess')
            return (<img rel='preload' src={require('../../chess.png')} className='w-100 rounded mx-auto d-block' alt='chess' />)
        
        if (form.type==='Tic-Tac-Toe')
            return (<img rel='preload' src={require('../../Tic_tac_toe.svg.png')} className='w-100 rounded mx-auto d-block' alt='tictactoe' />)
    }

    const Description = () => {
        if (form.type==='Tic-Tac-Toe') {
            return (
                <p style={{fontSize:20}}>Tic-tac-toe is a classic two-player game played on a 3x3 grid. The two players take turns placing their mark (usually an "X" or an "O") on one of the empty squares on the grid. The objective of the game is to be the first player to get three of their marks in a row, either horizontally, vertically, or diagonally.</p>
            )
        }

        if (form.type==='Math is Fun!') {
            return (
                <p style={{fontSize:20}}>Math is Fun! is an educational two-player game focused on basic mathematics. Once both players are ready, the round will begin and both players will have 60 seconds to solve as many equations as they can, earning one point per correct answer. The player with the most points at the end of the round will be declared the winner.</p>
            )
        }

        if (form.type==='Chess') {
            return (
                <p style={{fontSize:20}}></p>
            )
        }
    }


    return (
        <Container fluid className={`custom-h90 ${theme}`}>
            <Container className={`custom-h90 d-flex align-items-center justify-content-center`}>  
                <Col className=''>
                    <Images />
                </Col>
                <Col className='d-flex justify-content-center'>
                    <Form>
                        <h2>Create Game</h2>
                        <Form.Group className='mb-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name"
                                id="name"
                                value={ form.name }
                                onChange={ updateForm }
                                isInvalid={ errors.name } 
                            />
                            <Form.Control.Feedback type='invalid'>
                                { errors.name }
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label>Game Type</Form.Label>
                            <Form.Select id='type' value={ form.type} onChange={ updateForm }>
                                {games.map((game, i) => (    
                                    <option key={game._id} value={game.name}>{game.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label># of Players</Form.Label>
                            <Form.Select id='numPlayers' value={ form.numPlayers} onChange={ updateForm }>
                                <option value={2}>2</option>
                                <option value={4}>4</option>
                                <option value={8}>8</option>
                            </Form.Select>
                        </Form.Group>
                        <Row>
                            <Col>
                            <Button type="primary" onClick={ handleCreate } className='custom-btn'>
                                Create
                            </Button>
                            </Col>
                            <Col>
                            <Button type="cancel" onClick={ handleCancel } className='custom-btn'>
                                Cancel
                            </Button>
                            </Col>
                        </Row>
                    </Form> 
                </Col>
                <Col>
                    <Description />
                </Col>
            </Container>
        </Container>
    )
}

export default CreateGamePage