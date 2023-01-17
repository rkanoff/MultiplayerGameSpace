import Stack from 'react-bootstrap/Stack'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import useTheme from '../../context/themeProvider'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../context/authProvider'

const ErrorPage = () => {
    const { theme } = useTheme()
    const navigate = useNavigate()
    const { auth } = useAuth()

    const ReturnLink = () => {
        if (auth?.username) {
            return (
                <Nav.Link className='custom-link' onClick={() => navigate('/lobby')}>Return to Homepage</Nav.Link>
            )
        }
        else {
            return (
                <Nav.Link className='custom-link' onClick={() => navigate('/')}>Return to Homepage</Nav.Link>
            )
        }
    }

    return (
        <Container fluid className={`vh-100 d-flex ${theme}`}>
                    <Stack gap={1} className='d-flex align-items-center justify-content-center'>
                        <h1 className='display-1'>404 Error</h1>
                        <h2>Page not found</h2>
                        <h2>(╯°□°)╯︵ ┻━┻</h2>
                        <ReturnLink />
                    </Stack>                   
        </Container>
    )
}

export default ErrorPage