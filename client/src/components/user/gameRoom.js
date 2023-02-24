import useTheme from '../../context/themeProvider'
import useAuth from '../../context/authProvider'
import UserNavBar from './userNavBar'
import ChatRoom from './chatRoom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const GameRoom = () => {
    const { theme } = useTheme()
    const { auth } = useAuth()

    return (
        <Container fluid className={`vh-100 overflow-auto ${theme}`}>
            <UserNavBar/>
            <Row className='custom-h90'>
                <Col className='row align-items-center'>
                    <ChatRoom />
                </Col>
                <Col fluid className='pb-2'>
                        <iframe
                            src={`http://localhost:3001?username=${auth.username}&gameId=${auth.gameId}`}
                            width='100%'
                            height='100%'
                        />
                </Col>
            </Row>
        </Container>
    )
}

export default GameRoom