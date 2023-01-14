import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../context/authProvider'

const RequireAuth = () => {
    const { auth } = useAuth()
    const location = useLocation()

    return (
        auth?.username
            ? <Outlet />
            : <Navigate to='/' state={{ from: location }} replace />
    )
}

export default RequireAuth