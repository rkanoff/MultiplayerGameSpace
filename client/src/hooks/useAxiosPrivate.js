import { useEffect } from 'react'
import useRefresh from './useRefresh'
import useAuth from '../context/authProvider'
import axios from 'axios'

// use this for any api call that requires accessToken in header
const useAxiosPrivate = () => {
    const refresh = useRefresh()
    const { auth } = useAuth()

    useEffect(() => {
        // intercept request and add accessToken to header
        const requestIntercept = axios.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                }
                return config
            }, (error) => Promise.reject(error)
        )

        // intercept response and add new accessToken if valid refreshToken is in cookies
        const responseIntercept = axios.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true
                    const newAccessToken = await refresh()
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return axios(prevRequest)
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axios.interceptors.request.eject(requestIntercept)
            axios.interceptors.response.eject(responseIntercept)
        } 
    }, [auth, refresh])

    return axios
}

export default useAxiosPrivate