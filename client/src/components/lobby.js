import Button from 'react-bootstrap/Button'
import useRefresh from '../hooks/useRefresh'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import useAuth from '../hooks/useAuth'
import useTheme from '../hooks/useTheme'

const LobbyPage = () => {
    const refresh = useRefresh()
    const axiosPrivate = useAxiosPrivate()
    const { auth, setAuth } = useAuth()
    const { theme } = useTheme()

    const logout = async (event) => {
        event.preventDefault()
        await axiosPrivate.post('http://localhost:8081/auth/logout')
        setAuth()
    }

    return (
        <div className={`container-fluid vh-100 ${theme}`}>
            <h2>userId: {auth.userId}, username: {auth.username}, email: {auth.email}</h2>
            <h2>token: {auth.accessToken}</h2>
            <Button variant="primary" type="logout" onClick={ logout }>
                Logout
            </Button>
            <Button variant="primary" type="logout" onClick={ refresh }>
                test
            </Button>
        </div>
    )
}

export default LobbyPage