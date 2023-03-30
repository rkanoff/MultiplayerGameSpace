import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import NavDropdown from 'react-bootstrap/NavDropdown'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import useAuth from '../../context/authProvider'
import useTheme from '../../context/themeProvider'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserNavBar = () => {
    const { auth, setAuth } = useAuth()
    const { theme, setTheme } = useTheme()
    const navigate = useNavigate()

    const handleLogout = async (event) => {
        event.preventDefault()
        await axios.post('http://localhost:8081/auth/logout', {}, { withCredentials: true })
        setAuth()
    }

    const AdminLinks = () => {
        if (auth?.isAdmin) {
            return (
                <>
                <Nav.Link className='custom-nav' onClick={() => navigate('/adminLobby')}>Lobby(Admin only)</Nav.Link>
                <Nav.Link className='custom-nav' onClick={() => navigate('/adminUsers')}>User List(Admin only)</Nav.Link>
                </>
            )
        }
        else {
            return (
                <></>
            )
        }
    }

    return (
        <Navbar expand='lg' sticky='top' id='custom-nav' className={`custom-nav custom-h10 ${theme}`}>
            <Container fluid>
                <Navbar.Brand className='custom-nav'>Multiplayer Game Space</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>    
                        <Nav.Link className='custom-nav' onClick={() => navigate('/lobby')}>Lobby</Nav.Link>   
                        <Nav.Link className='custom-nav' onClick={() => navigate('/createGame')}>Create Game</Nav.Link>
                        <AdminLinks />
                        <NavDropdown title='Options'>     
                            <ToggleButtonGroup type='radio' name='themeOption' defaultValue={theme} onChange={setTheme}>
                                <ToggleButton className='custom-btn' id='darkMode' value={'dark'}>
                                    Dark Mode
                                </ToggleButton>
                                <ToggleButton className='custom-btn' id='lightMode' value={'light'}>
                                    Light Mode
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </NavDropdown>
                        <Nav.Link className='custom-nav' onClick={ handleLogout }>Logout</Nav.Link>
                    </Nav>
                    <Navbar.Text className='custom-nav'>
                            You are logged in as: {auth?.username}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default UserNavBar