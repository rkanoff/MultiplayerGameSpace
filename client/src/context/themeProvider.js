import { createContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

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

export default ThemeContext