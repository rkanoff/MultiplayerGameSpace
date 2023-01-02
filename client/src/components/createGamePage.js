import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import UserNavBar from './userNavBar';

const CreateGamePage = () => {
    const url = "http://localhost:8081/users/register"
    const navigate = useNavigate()
    const [form, setForm] = useState({username : "", email : "", password : ""})
    const { theme } = useTheme()

    const updateForm = ({ target : input }) => {
        setForm({ ...form, [input.id] : input.value });
    }

    const handleRegister = async (event) => {
        event.preventDefault()
        try {
            await axios.post(url, form)
            navigate("/")
        }
        catch (error) {
            window.alert(error.response.data.message)
        }
    }

    const handleCancel = async (event) => {
        event.preventDefault()
        navigate("/")
    }

    return (
        <Container fluid className={`vh-100 d-flex justify-content-center align-items-center ${theme}`}>
            
            <Form>
                <h2>Register Below!</h2>
                <Form.Group className='mb-3'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username"
                        id="username"
                        value={ form.username }
                        onChange={ updateForm }
                    />
                    <Form.Text>
                        Username must be 8-20 characters long
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter email"
                        id="email"
                        value={ form.email }
                        onChange={ updateForm }
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder="Enter password"
                        id="password"
                        value={ form.password }
                        onChange={ updateForm }
                    />
                    <Form.Text>
                        Password must be 8-20 characters long
                    </Form.Text>
                </Form.Group>
                <Row>
                    <Col>
                    <Button type="primary" onClick={ handleRegister } className='custom-btn'>
                        Submit
                    </Button>
                    </Col>
                    <Col>
                    <Button type="cancel" onClick={ handleCancel } className='custom-btn'>
                        Cancel
                    </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default CreateGamePage