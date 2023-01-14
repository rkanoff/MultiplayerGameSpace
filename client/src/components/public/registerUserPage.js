import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTheme from '../../context/themeProvider';
import { newUserValidation } from '../../models/userValidation'

const RegisterUserPage = () => {
    const url = "http://localhost:8081/users/register"
    const navigate = useNavigate()
    const [form, setForm] = useState({username: "", email: "", password: ""})
    const { theme } = useTheme()
    const [errors, setErrors] = useState({ username: null, email: null, password: null })

    const updateForm = ({ target : input }) => {
        setForm({ ...form, [input.id] : input.value });
        setErrors({ username: null, email: null, password: null })
    }

    const updateErrors = (error) => {
        const newErrors = () =>  {
            error.forEach(err => {
                Object.assign(newErrors, ({[err.path]: err.message}))
            })
            return newErrors
        }
        setErrors(newErrors)
    }

    const handleRegister = async (event) => {
        event.preventDefault()
        const { error } = newUserValidation(form)
        if (error) updateErrors(Object.values(error.issues))
        if (!error)
        {
            try {
                await axios.post(url, form)
                navigate("/")
            }
            catch (error) {
                const name = error.response.data.message.split(' ')[0].toLowerCase()
                if (error.response.status === 409 ) 
                    setErrors({ ...errors, [name]: error.response.data.message})
            }
        }
    }

    const handleCancel = async (event) => {
        event.preventDefault()
        navigate("/")
    }

    return (
        <Container fluid className={`vh-100 d-flex align-items-center justify-content-center ${theme}`}>    
            <Form>
                <h2>Register Below!</h2>
                <Form.Group className='mb-3'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username"
                        id="username"
                        value={ form.username }
                        onChange={ updateForm }
                        isInvalid={ errors.username }
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.username}
                    </Form.Control.Feedback>
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
                        isInvalid={ errors.email }
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password"
                        id="password"
                        value={ form.password }
                        onChange={ updateForm }
                        isInvalid={ errors.password }
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.password}
                    </Form.Control.Feedback>
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

export default RegisterUserPage