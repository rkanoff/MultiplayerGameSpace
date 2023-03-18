import useTheme from '../../context/themeProvider'
import useAuth from '../../context/authProvider'
import UserNavBar from './userNavBar'
import ChatRoom from './chatRoom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import IframeResizer from 'iframe-resizer-react'
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
        <Container fluid className={`vh-100 overflow-hidden ${theme}`}>
            <UserNavBar/>
            <Row className='flex-xxl-row flex-column-reverse custom-h90'>
                <Col className='row align-items-center'>
                    <ChatRoom />
                </Col>
                <Col className='row align-items-center'>
                        <IframeResizer
                            log
                            src={url}
                            style={{ width: '1px', minWidth: '100%', height: '1px', minHeight: '70%'}}
                        />
                </Col>
            </Row>
        </Container>
    )
}

export default GameRoom