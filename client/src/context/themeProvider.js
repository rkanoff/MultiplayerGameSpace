import { createContext, useEffect, useState, useContext } from 'react'

// create context for theme
const ThemeContext = createContext()

// create theme provider to wrap app
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')
    
    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            { children }
        </ThemeContext.Provider>
    )
}

// import to use theme with component
const useTheme = () => {
    return(useContext(ThemeContext))
}

export default useTheme