import { createContext, useState, useContext } from 'react'

// create context for auth
const AuthContext = createContext({})

// create auth provider to wrap app 
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            { children }
        </AuthContext.Provider>
    )
}

// import to use auth with component
const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth