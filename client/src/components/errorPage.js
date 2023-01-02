import Row from 'react-bootstrap/Row'
import Stack from 'react-bootstrap/Stack'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import useTheme from '../hooks/useTheme'

const ErrorPage = () => {
    const { theme } = useTheme()

{/* <div className={`container-fluid vh-100 ${theme}`}>
            <div className="row d-flex justify-content-center align-items-center h-100 "> 
        <Row className="align-items-center">
                <Col className="d-flex justify-content-center">
        
        */}

    return (
        <Container fluid className={`vh-100 d-flex ${theme}`}>
                    <Stack gap={1} className='d-flex align-items-center justify-content-center'>
                        <h1 class='display-1'>404 Error</h1>
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