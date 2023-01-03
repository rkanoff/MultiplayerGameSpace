import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import UserNavBar from './userNavBar';
import useAuth from '../hooks/useAuth';

const CreateGamePage = () => {
    const url = "http://localhost:8081/games/create"
    const navigate = useNavigate()
    const { auth } = useAuth()
    const [form, setForm] = useState({name: "", type: "Just Chatting", numPlayers: "2", players: [auth.username]})
    const { theme } = useTheme()

    const updateForm = ({ target : input }) => {
        setForm({ ...form, [input.id] : input.value });
    }

    const handleCreate = async (event) => {
        event.preventDefault()
        try {
            await axios.post(url, form)
            navigate("/lobby")
        }
        catch (error) {
            window.alert(error.response.data.message)
        }
    }

    const handleCancel = async (event) => {
        event.preventDefault()
        navigate("/lobby")
    }

    return (
        <>
        <UserNavBar />
        <Container fluid className={`vh-100 d-flex align-items-center justify-content-center ${theme}`}>
            <Form>
                <h2>Create Game</h2>
                <Form.Group className='mb-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter username"
                        id="name"
                        value={ form.name }
                        onChange={ updateForm }
                    />
                    <Form.Text>
                        Username must be 8-20 characters long
                    </Form.Text>
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
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="8">8</option>
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
        </>
    )
}

export default CreateGamePage