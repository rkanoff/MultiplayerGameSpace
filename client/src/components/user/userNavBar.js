import Container from 'react-bootstrap/Container'
import NavBar from 'react-bootstrap/NavBar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import useAuth from '../../context/authProvider'
import useTheme from '../../context/themeProvider'
import axios from 'axios'

const UserNavBar = () => {
    const { auth, setAuth } = useAuth()
    const { theme, setTheme } = useTheme()

    const handleLogout = async (event) => {
        event.preventDefault()
        await axios.post('http://localhost:8081/auth/logout', {}, { withCredentials: true })
        setAuth()
    }

    const AdminLinks = () => {
        if (auth.isAdmin) {
            return (
                <>
                <Nav.Link className='custom-nav' href='/adminLobby'>Lobby(Admin only)</Nav.Link>
                <Nav.Link className='custom-nav' href='/adminUsers'>User List(Admin only)</Nav.Link>
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
        <NavBar className={`custom-nav ${theme}`}>
            <Container fluid>
                <NavBar.Brand className='custom-nav'>Multiplayer Game Space</NavBar.Brand>
                <NavBar.Collapse>
                    <Nav>    
                        <Nav.Link className='custom-nav' href='/lobby'>Home </Nav.Link>   
                        <Nav.Link className='custom-nav' href='/createGame'>Create Game</Nav.Link>
                        <Nav.Link className='custom-nav' href='/chatRoom'>Chat Room</Nav.Link>
                        <AdminLinks />
                    </Nav>
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
                    <Nav>
                        <Nav.Link className='custom-nav' onClick={ handleLogout }>Logout</Nav.Link>
                    </Nav>
                </NavBar.Collapse>
                <NavBar.Text className='custom-nav'>
                    You are logged in as: {auth.username}
                </NavBar.Text>
            </Container>
        </NavBar>
    )
}

export default UserNavBar