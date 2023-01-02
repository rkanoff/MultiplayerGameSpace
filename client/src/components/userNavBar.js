import Container from 'react-bootstrap/Container'
import NavBar from 'react-bootstrap/NavBar'
import Nav from 'react-bootstrap/Nav'
import Col from 'react-bootstrap/Col'
import NavDropdown from 'react-bootstrap/NavDropdown'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import useAuth from '../hooks/useAuth'
import useTheme from '../hooks/useTheme'
import axios from '../api/axios'

const UserNavBar = () => {
    const { auth, setAuth } = useAuth()
    const { theme, setTheme } = useTheme()

    const handleLogout = async (event) => {
        event.preventDefault()
        await axios.post('http://localhost:8081/auth/logout', {}, { withCredentials: true })
        setAuth()
    }

    return (
        <NavBar className={`custom-nav sticky ${theme}`}>
            <Container fluid>
                <NavBar.Brand className='custom-nav'>Multiplayer Game Space</NavBar.Brand>
                <NavBar.Collapse>
                    <Nav>    
                        <Nav.Link className='custom-nav' href='/lobby'>Home</Nav.Link>   
                        <Nav.Link className='custom-nav' onClick={ handleLogout }>Logout</Nav.Link>
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
                </NavBar.Collapse>
                <NavBar.Text className='custom-nav'>
                    You are logged in as: {auth.username}
                </NavBar.Text>
            </Container>
        </NavBar>
    )
}

export default UserNavBar