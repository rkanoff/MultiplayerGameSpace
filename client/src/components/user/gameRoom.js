import useTheme from '../../context/themeProvider'
import useAuth from '../../context/authProvider'
import UserNavBar from './userNavBar'
import ChatRoom from './chatRoom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useEffect, useState } from 'react'
import axios from 'axios'

const GameRoom = () => {
    const { theme } = useTheme()
    const { auth } = useAuth()
    const [url, setUrl] = useState('')

    useEffect(() => {
        axios.get('http://localhost:8081/games/getAppAddress', { params:{ gameId: auth.gameId }})
            .then((res) =>
                setUrl(res.data[0].gameAddress+"?username="+auth.username+'&gameId='+auth.gameId)) 
            .catch((error) => console.log(error))
    }, [])

    return (
        <Container fluid className={`vh-100 overflow-auto ${theme}`}>
            <UserNavBar/>
            <Row className='flex-xxl-row flex-sm-column-reverse custom-h90'>
                <Col className='row align-items-center'>
                    <ChatRoom />
                </Col>
                <Col className='row align-items-center'>
                    <iframe style={{ minHeight: '400px', height: '75%', borderRadius: '5%'}} src={url} />
                </Col>
            </Row>
        </Container>
    )
}

export default GameRoom