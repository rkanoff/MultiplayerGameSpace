import Stack from 'react-bootstrap/Stack'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import useTheme from '../../context/themeProvider'

const ErrorPage = () => {
    const { theme } = useTheme()

    return (
        <Container fluid className={`vh-100 d-flex ${theme}`}>
                    <Stack gap={1} className='d-flex align-items-center justify-content-center'>
                        <h1 className='display-1'>404 Error</h1>
                        <h2>Page not found</h2>
                        <h2>(╯°□°)╯︵ ┻━┻</h2>
                        <Nav.Item>
                            <Nav.Link className='custom-link' href='/'>Return to Homepage</Nav.Link>
                        </Nav.Item>
                    </Stack>                   
        </Container>
    )
}

export default ErrorPage