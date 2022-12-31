import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';

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
        <>
        <div className={`container-fluid vh-100 ${theme}`}>
            <div className="row d-flex justify-content-center align-items-center h-100 ">
                <Row className="align-items-center">
                <Col className="d-flex justify-content-center">
                    <Form className="w-50">
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
                        <Button variant="primary" type="submit" onClick={ handleLogin }>
                            Submit
                        </Button>
                        <ToggleButtonGroup type='radio' name='themeOption' defaultValue={theme} onChange={setTheme}>
                            <ToggleButton id='darkMode' value={'dark'}>
                                Dark Mode
                            </ToggleButton>
                            <ToggleButton id='lightMode' value={'light'}>
                                Light Mode
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Form>
                </Col>
                <Col className="d-flex justify-content-center">
                <Container>
                    <h1>Multiplayer Game Space</h1>
                    <h5>New user? Register below!</h5>
                    <Button variant="primary" type="submit" onClick={ handleRegister }>
                        Register
                    </Button>
                </Container> 
                </Col>
                </Row>
            </div>
        </div>
        </>
    )
}

export default LandingPage;