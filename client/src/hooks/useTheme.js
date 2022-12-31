import { useContext } from 'react'
import ThemeContext from '../context/themeProvider'

const useTheme = () => {
    return(useContext(ThemeContext))
}

export default useTheme