import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useRefresh from '../../hooks/useRefresh'
import IsLoading from './isLoading'
import useTheme from '../../context/themeProvider'
import Container from 'react-bootstrap/Container'

const PersistUser = () => {
    const refresh = useRefresh()
    const [isLoading, setLoading] = useState(true)
    const { theme } = useTheme() 

    useEffect(() => {
        const checkToken = async () => {
            try {
                await refresh()
            } catch (err) {
                console.log(err)
            }
            finally {
                setLoading(false)
            }
        }
        if (isLoading) checkToken()
    })

    return (
        isLoading
            ? <IsLoading /> 
            : <Outlet />
    )
}

export default PersistUser