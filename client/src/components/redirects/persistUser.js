import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useRefresh from '../../hooks/useRefresh'

const PersistUser = () => {
    const refresh = useRefresh()
    const [isLoading, setLoading] = useState(true)

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
            ? <p> Loading </p>
            : <Outlet />
    )
}

export default PersistUser