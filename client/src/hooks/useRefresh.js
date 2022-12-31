import axios from '../api/axios'
import useAuth from './useAuth'
import jwt_decode from 'jwt-decode'

const useRefresh = () => {
    const { auth, setAuth } = useAuth()
    

    const refresh = async () => {
        const response = await axios.get('http://localhost:8081/auth/refresh', {
            withCredentials: true
        })
        setAuth(prev => {
            const decoded = jwt_decode(response.data.accessToken)
            console.log(JSON.stringify(response.data.accessToken))
            return { ...prev, 
                        accessToken: response.data.accessToken, 
                        username: decoded.userInfo.username,
                        email: decoded.userInfo.email,
                        userId: decoded.userInfo.userId
                    }
        })
        return auth
    }
    return refresh
}

export default useRefresh