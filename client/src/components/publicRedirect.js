import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const PublicRedirect = () => {
    const { auth } = useAuth()
    const location = useLocation()

    return (
        auth?.username
            ? <Navigate to='/lobby' state={{ from: location }} replace />
            : <Outlet />
    )
}

export default PublicRedirect