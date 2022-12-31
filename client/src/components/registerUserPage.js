import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTheme from '../hooks/useTheme';

const RegisterUserPage = () => {
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

    return (
        <>
        <div className={`container-fluid vh-100 ${theme}`}>
            <div className="row d-flex justify-content-center align-items-center h-100 ">
                <Row className="align-items-center">
                <Col className="d-flex justify-content-center">
                    <Form>
                        <h2 className="mb-3">Register Below!</h2>
                        <Form.Group className="mb-3">
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
                        <Button type="primary" onClick={ handleRegister } className='custom-btn'>
                            Submit
                        </Button>
                    </Form>
                </Col>
                </Row>
            </div>
        </div>
        </>
    )
}

export default RegisterUserPage