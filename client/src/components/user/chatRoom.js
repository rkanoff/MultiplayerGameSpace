import useTheme from '../../context/themeProvider'
import UserNavBar from '../user/userNavBar'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import useAuth from '../../context/authProvider'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { io } from 'socket.io-client'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const ChatRoom = () => {
    const { theme } = useTheme()
    const { auth, setAuth } = useAuth()
    const [newMessage, setNewMessage] = useState({ message: '' })
    const [allMessages, setAllMessages] = useState([])
    const [connection, setConnection] = useState()
    const [playerList, setPlayerList] = useState([])
    const navigate = useNavigate()
    const mesRef = useRef(null)

    useEffect(() => {
        const socket = io('localhost:8082', { auth: { gameId: auth.gameId }})
        socket.emit('newPlayer', auth.username)
        setConnection(socket)

        socket.on('message', (message) => {
            setAllMessages(prev => [...prev, message])  
        })

        socket.on('newPlayer', (message) => {
            const newMessage = message + " has joined!"
            setAllMessages(prev => [...prev, newMessage])
            getPlayerList()
        })

        socket.on('playerLeft', (message) => {
            getPlayerList()
        })

        return async () => {    
            const newMessage = auth.username + ' user has left'
            socket.emit('message', newMessage)
            socket.emit('playerLeft')
            socket.close()
            setConnection()
            await axiosPrivate.post('http://localhost:8081/games/removePlayer', { username: auth.username, gameId: auth.gameId })
            setAuth(prev => { return {...prev, connected: false, gameId: ''}})
        }
    }, [])

    useEffect(() => {
        mesRef.current.scroll(0,mesRef.current.scrollHeight)
    }, [allMessages])

    // must be declared after useEffect or cleanup removes interceptors too early
    const axiosPrivate = useAxiosPrivate()

    const getPlayerList = async () => {
        await axiosPrivate
            .get('http://localhost:8081/games/playerList', { params: { gameId: auth.gameId }})
            .then((res) => {
                setPlayerList(res.data)
            })
            .catch((error) => console.log(error))
    }

    const updateForm = ({ target: input}) => {
        setNewMessage({ ...newMessage, [input.id]: input.value })
    }

    const sendMessage = async (event) => {
        event.preventDefault()
        connection.emit('message', auth.username + ': ' + newMessage.message)
        setNewMessage({ message: '' })
    }

    return (
        <Container fluid className={`vh-100 ${theme}`}>
            <Row className='pb-2'>
                <UserNavBar/>
            </Row>
            <Container className=''>
                <Form>
                    <Row>
                    <Col>

                    <Form.Group className='mb-3' controlId='messageArea'>
                    <Form.Label className='row justify-content-center'>Chat</Form.Label>
                        <Form.Control ref={mesRef} as='textarea' rows={10} readOnly value={ allMessages.toString().replaceAll(',', '\n') }/>
                    </Form.Group>
                    
                    <Form.Group className='mb-3'>
                        <Form.Control type='text' placeholder='Enter message here'
                            id='message'
                            value={ newMessage.message }
                            onChange={ updateForm } 
                        />  
                    </Form.Group>

                    </Col>
                    <Col xs='auto'>

                    <Form.Group className='mb-3 overflow-y' controlId='userArea'>
                    <Form.Label className='row justify-content-center'>Player List</Form.Label>
                        <Form.Control as='textarea' rows={10} readOnly value={ playerList.toString().replaceAll(',', '\n') }/>
                    </Form.Group>
                    <Row>
                    <Col>
                    <Button type='primary' onClick={ sendMessage } className='custom-btn'> 
                        Send
                    </Button>
                    </Col>
                    <Col>
                    <Button type='primary' onClick={ () => navigate('/lobby') } className='custom-btn'> 
                        Leave
                    </Button>
                    </Col>
                    </Row>
                    </Col>
                    </Row>
                </Form>
            </Container>
        </Container>
    )
}

export default ChatRoom