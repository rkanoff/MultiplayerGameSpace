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
import jwt_decode from 'jwt-decode'
import useAuth from '../../context/authProvider'
import useTheme from '../../context/themeProvider'

const LandingPage = () => {
    const navigate = useNavigate()
    const url = "http://localhost:8081/auth/login"
    const [form, setForm] = useState({username : "", password : ""})
    const { setAuth } = useAuth()
    const { theme, setTheme } = useTheme()
    const [errors, setErrors] = useState({username: null, password: null})

    const updateForm = async ({ target : input}) => {
        setForm({ ...form, [input.id] : input.value })
        setErrors({username: null, password: null})
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const { data: res } = await axios.post(url, form, { withCredentials: true })
            const { accessToken } = res
            const decoded = jwt_decode(accessToken)
            setAuth({username: form.username,  isAdmin: decoded.userInfo.isAdmin, accessToken: accessToken})
            navigate("/lobby")
        }
        catch (error) {
            if (error.response.status === 404)
                setErrors({username: error.response.data.message})
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
                                isInvalid={ errors.username } 
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" 
                                id="password"
                                value={ form.password }
                                onChange={ updateForm } 
                                isInvalid={ errors.username}   
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