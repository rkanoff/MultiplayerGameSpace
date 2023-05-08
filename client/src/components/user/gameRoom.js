import useTheme from '../../context/themeProvider'
import useAuth from '../../context/authProvider'
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
        <Container fluid className={`d-flex align-items-center overflow-auto ${theme}`} style={{minHeight: '43.3rem'}}>
            <Row className='flex-xxl-row flex-sm-column-reverse col-12 align-items-center'>
                <Col className='row align-items-center ' style={{maxWidth: '50rem'}}>
                    <ChatRoom />
                </Col>
                <Col className='row align-items-center p-2' style={{maxWidth: '50rem'}}>
                    <iframe style={{ minHeight: '10cm', height:'26rem', borderRadius: '5%'}} src={url} />
                </Col>
            </Row>
        </Container>
    )
}

export default GameRoom