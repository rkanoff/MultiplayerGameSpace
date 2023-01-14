import useTheme from '../../context/themeProvider'
import UserNavBar from '../user/userNavBar'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import useAuth from '../../context/authProvider'
import { io } from 'socket.io-client'
import { useState, useEffect } from 'react'

const socket = io('localhost:8082', { withCredentials: true })

const ChatRoom  = () => {
    const { theme } = useTheme()
    const [newMessage, setNewMessage] = useState({ message: '' })
    const [allMessages, setAllMessages] = useState('')


    useEffect(() => {
        if(!socket.status) {
            socket.on('connect', () => {
                console.log('connected')   
            })
        }

        socket.on('message', (message) => {
            setAllMessages(allMessages => allMessages + message + '\n')
        })
    }, [])

    const updateForm = ({ target: input}) => {
        setNewMessage({ ...newMessage, [input.id]: input.value })
    }

    const sendMessage = async (event) => {
        event.preventDefault()
        socket.emit('message', newMessage.message)
    }

    return (
        <Container fluid className={`vh-100 ${theme}`}>
            <Row className='custom-h10 row justify-content-center pb-2'>
                <UserNavBar/>
            </Row>
            <Container className='custom-h90 '>
                <Form>
                    <Form.Group className='mb-3' controlId='messageArea'>
                        <Form.Control as='textarea' rows={5} readOnly value={ allMessages }/>
                    </Form.Group>
                    <Row>
                        <Col>
                        <Form.Group className='mb-3'>
                            <Form.Control type='text' placeholder='Enter message here'
                                id='message'
                                value={ newMessage.message }
                                onChange={ updateForm } 
                            />  
                        </Form.Group>
                        </Col>
                        <Col>
                        <Button type='primary' onClick={ sendMessage } className='custom-btn'> 
                            Send
                        </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </Container>
    )
}

export default ChatRoom