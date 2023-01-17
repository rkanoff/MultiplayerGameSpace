import useTheme from '../../context/themeProvider'
import Container from 'react-bootstrap/Container'

const IsLoading = () => {
    const { theme } = useTheme()

    return (
        <Container className={`${theme}`}>
        </Container>
    )
}

export default IsLoading