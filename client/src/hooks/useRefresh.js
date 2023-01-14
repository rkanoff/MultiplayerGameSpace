import axios from 'axios'
import useAuth from '../context/authProvider'
import jwt_decode from 'jwt-decode'

const useRefresh = () => {
    const { setAuth } = useAuth()
    
    // call refresh api and set auth with returned token
    const refresh = async () => {
        const response = await axios.get('http://localhost:8081/auth/refresh', {
            withCredentials: true
        })
        setAuth(prev => {
            const decoded = jwt_decode(response.data.accessToken)
            return { ...prev, 
                        accessToken: response.data.accessToken, 
                        username: decoded.userInfo.username,
                        email: decoded.userInfo.email,
                        userId: decoded.userInfo.userId,
                        isAdmin: decoded.userInfo.isAdmin
                    }
        })
        return response.data.accessToken
    }
    return refresh
}

export default useRefresh