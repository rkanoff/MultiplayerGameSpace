import useTheme from '../../context/themeProvider'
import UserNavBar from '../user/userNavBar'
import Container from 'react-bootstrap/esm/Container'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useState, useEffect } from 'react'

const AdminUsersPage = () => {
    const { theme } = useTheme()
    const axiosPrivate = useAxiosPrivate()
    const [users, setUsers] = useState([])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getUsers = async () => {
        await axiosPrivate
            .get('http://localhost:8081/admin/getUsers')
            .then((res) => {
                setUsers(res.data)
            })
            .catch((error) =>  console.log(error))
    }   

    const handleRemove = async (userId, isAdmin) => {
        if (isAdmin) {
            handleShow()
            return
        }
        await axiosPrivate.post('http://localhost:8081/admin/removeUser', { userId })
        getUsers()
    }

    useEffect(() => {
        getUsers()
    },[])

    return (
        <Container fluid className={`vh-100 ${theme}`}>
            <UserNavBar/>
            <Table striped border='true' variant={theme}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>
                            <Button className='custom-btn' onClick={getUsers} > 
                                Refresh
                            </Button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, i) => (
                        <tr key={user._id} >    
                            <th>{user._id}</th>
                            <th>{user.username}</th>
                            <th>{user.email}</th>
                            <th>{`${user.isAdmin}`}</th>
                            <th>
                                <Button className='custom-btn' onClick={e => handleRemove(user._id, user.isAdmin)} > 
                                    Remove
                                </Button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose} dialogClassName={`${theme}`}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Cannot remove admin
                </Modal.Body>
                <Modal.Footer >
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default AdminUsersPage