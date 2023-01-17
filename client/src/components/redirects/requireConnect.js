import { useLocation, useNavigate, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../context/authProvider'
import ErrorPage from '../public/errorPage'

const RequireConnect = () => {
    const { auth } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    return (
        auth?.connected
            ? <Outlet />
            : <Navigate to='/' state={{ from: location }} replace />
    )
}

export default RequireConnect