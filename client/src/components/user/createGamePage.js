import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useTheme from '../../context/themeProvider'
import UserNavBar from './userNavBar'
import useAuth from '../../context/authProvider'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { newGameValidation } from '../../models/gameValidation'

const CreateGamePage = () => {
    const url = "http://localhost:8081/games/create"
    const navigate = useNavigate()
    const { auth } = useAuth()
    const [form, setForm] = useState({name: "", type: "Just Chatting", numPlayers: 2, players: []})
    const { theme } = useTheme()
    const axiosPrivate = useAxiosPrivate()  
    const [errors, setErrors] = useState({name: null})

    const updateForm = ({ target : input }) => {
        if (input.id === 'numPlayers')    
            setForm({ ...form, [input.id] : parseInt(input.value) })
        else
            setForm({ ...form, [input.id] : input.value })
        setErrors({ name: null })
    }   

    const updateErrors = (error) => {
        const newErrors = {[error[0].path]: error[0].message}
        console.log(newErrors)
        setErrors(newErrors)
    }

    const handleCreate = async (event) => {
        event.preventDefault()
        const { error } = newGameValidation(form)
        if (error) updateErrors(Object.values(error.issues))
        if(!error)
        {
            try {
                await axiosPrivate.post(url, form)
                navigate("/lobby")
            }
            catch (error) {
                window.alert(error.response.data.message)
            }
        }
    }

    const handleCancel = async (event) => {
        event.preventDefault()
        navigate("/lobby")
    }

    return (
        <Container fluid className={`vh-100 ${theme}`}>
            <Row className='custom-h10 row justify-content-center pb-2'>
                <UserNavBar/>
            </Row>
            <Container className='custom-h90 d-flex align-items-center justify-content-center'>
            <Form>
                <h2>Create Game</h2>
                <Form.Group className='mb-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name"
                        id="name"
                        value={ form.name }
                        onChange={ updateForm }
                        isInvalid={ errors.name } 
                    />
                    <Form.Control.Feedback type='invalid'>
                        { errors.name }
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Game Type</Form.Label>
                    <Form.Select id='type' value={ form.type} onChange={ updateForm }>
                        <option value="Just Chatting">Just Chatting</option>
                        <option value="Tic-Tac-Toe">Tic-Tac-Toe</option>
                        <option value="Connect-4">Connect-4</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label># of Players</Form.Label>
                    <Form.Select id='numPlayers' value={ form.numPlayers} onChange={ updateForm }>
                        <option value={2}>2</option>
                        <option value={4}>4</option>
                        <option value={8}>8</option>
                    </Form.Select>
                </Form.Group>
                <Row>
                    <Col>
                    <Button type="primary" onClick={ handleCreate } className='custom-btn'>
                        Create
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
        </Container>
    )
}

export default CreateGamePage