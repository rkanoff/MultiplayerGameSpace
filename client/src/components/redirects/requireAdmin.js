import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../context/authProvider'

const RequireAdmin = () => {
    const { auth } = useAuth()
    const location = useLocation()

    return (
        auth?.isAdmin
            ? <Outlet />
            : <Navigate to='/' state={{ from: location }} replace />
    )
}

export default RequireAdmin