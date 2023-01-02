import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Nav from 'react-bootstrap/Nav'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../hooks/useAuth'
import useTheme from '../hooks/useTheme'

const LandingPage = () => {
    const navigate = useNavigate()
    const url = "http://localhost:8081/auth/login"
    const [form, setForm] = useState({username : "", password : ""})
    const { setAuth } = useAuth()
    const { theme, setTheme } = useTheme()

    const updateForm = ({ target : input}) => {
        setForm({ ...form, [input.id] : input.value });
    };

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const { data: res } = await axios.post(url, form, { withCredentials: true })
            const { accessToken } = res
            setAuth({username: form.username, accessToken: accessToken})
            navigate("/lobby")
        }
        catch (error) {
            window.alert(error)
        }
    }

    const handleRegister = async (event) => {
        event.preventDefault()
        navigate("/register")
    }

    return (
        <Container fluid className={`vh-100 d-flex align-items-center ${theme}`}>
            <Col>
                <Stack className='align-items-center'>
                    <Form className='w-50'>
                        <h2>Login</h2>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username"
                                id="username"
                                value={ form.username }
                                onChange={ updateForm }    
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" placeholder="Enter Password" 
                                id="password"
                                value={ form.password }
                                onChange={ updateForm }    
                            />
                        </Form.Group>
                        <Row>
                            <Col>
                            <Button className='custom-btn' type="submit" onClick={ handleLogin }>
                                Submit
                            </Button>
                            </Col>
                            <Col md='auto'>
                            <ToggleButtonGroup type='radio' name='themeOption' defaultValue={theme} onChange={setTheme}>
                                <ToggleButton className='custom-btn' id='darkMode' value={'dark'}>
                                    Dark Mode
                                </ToggleButton>
                                <ToggleButton className='custom-btn' id='lightMode' value={'light'}>
                                    Light Mode
                                </ToggleButton>
                            </ToggleButtonGroup>
                            </Col>
                        </Row>
                    </Form>
                </Stack>
            </Col>
            <Col>
                <Stack className='d-flex align-items-center'>
                    <h1 className='display-4'>Multiplayer Game Space</h1>
                    <Nav.Item>
                            <Nav.Link style={{fontSize:"28px"}} className='custom-link' onClick={ handleRegister }>New user? Register here!</Nav.Link>
                    </Nav.Item>
                </Stack>
            </Col>
        </Container>
    )
}

export default LandingPage;