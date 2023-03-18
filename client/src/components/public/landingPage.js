import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Nav from 'react-bootstrap/Nav'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import useAuth from '../../context/authProvider'
import useTheme from '../../context/themeProvider'
import Fade from 'react-bootstrap/Fade'
import Image from 'react-bootstrap/Image'

const LandingPage = () => {
    const navigate = useNavigate()
    const url = "http://localhost:8081/auth/login"
    const [form, setForm] = useState({username : "", password : ""})
    const { setAuth } = useAuth()
    const { theme, setTheme } = useTheme()
    const [errors, setErrors] = useState({username: null, password: null})
    const [open, setOpen] = useState(true);
    const [currImg, setCurrImg] = useState(true);

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

    const timer = () => {
        const timer1 = setTimeout(() => {
            setOpen(false)
            const timer2 = setTimeout(() => {
                setCurrImg(!currImg)
                setOpen(true)
            }, 1600)
            return () => clearTimeout(timer2);
        }, 5000)
        return () => clearTimeout(timer1);
    }

    const Images = () => {
        if (currImg) {
            return (
                <>
                <h1 className='display-5'>Tic-Tac-Toe: X's vs O's!</h1>
                <img src={require('../../Tic_tac_toe.svg.png')} className='customImg' alt='tictactoe' />
                <h1 className='display-5'>Rumble in the 3x3 Jungle!</h1>
                </>
            )
        }

        if (!currImg) {
            return (
                <>
                <h1 className='display-5'>Math is Fun!</h1>
                <img src={require('../../math.png')} style={{ width: 400, height: 500 }} className='customImg' alt='counter' />
                <h1 className='display-5 text-center'>Who will be the Ultimate Mathlete?</h1>
                </>
            )
        }
    }

    useEffect(() => {
        timer()
    }, [currImg])

    return (
        <Container fluid className={`vh-100 d-flex align-items-center ${theme}`}>
            <Col>
                <Stack className='align-items-center'>
                    <h1 className='display-4 text-center mb-5 customTitle' >Multiplayer Game Space</h1>
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
                        <Nav.Item>
                            <Nav.Link className='custom-link mt-3' onClick={ handleRegister }>New user? Register here!</Nav.Link>
                    </Nav.Item>
                    </Form>
                </Stack>
            </Col>
            <Col>
                <Fade in={open} appear className='customFade'>
                    <Stack 
                    className='d-flex align-items-center' 
                    id="example-fade-text"
                    onClick={() => setOpen(!open)}
                    aria-controls="example-fade-text"
                    aria-expanded={open}
                    >
                        <Images />
                    </Stack>
                </Fade>
            </Col>
        </Container>
    )
}

export default LandingPage;