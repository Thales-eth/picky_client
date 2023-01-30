import './ProfileEditPage.css'
import { Row, Col, Form, Button, Container } from 'react-bootstrap'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import PhotoService from '../../services/photos.service'
import UserService from '../../services/users.service'
import { MessageContext } from '../../context/userMessage.context'
import { AuthContext } from '../../context/auth.context'

const ProfileEditPage = () => {

    const [user, setUser] = useState({
        id: "",
        username: "",
        email: "",
        avatar: ""
    })

    const [canClick, setCanClick] = useState(false)

    const { username, email, avatar } = user

    const { setShowMessage } = useContext(MessageContext)

    const { getToken, authenticateUser } = useContext(AuthContext)

    const navigate = useNavigate()

    useEffect(() => {
        console.log("EL NUEVO UZER ==>", user)
    }, [user])

    useEffect(() => {
        const token = getToken()

        UserService
            .getLoggedUser(token)
            .then(user => {
                setUser(user)
            })
            .catch(e => console.log(e))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        UserService
            .editUser(user?._id, user)
            .then((user) => {
                console.log("QUIÉN HAY AQUÍ", user)
                setShowMessage({
                    show: true,
                    title: "Congratulations ✔",
                    text: "Profile Successfully edited!"
                })
                authenticateUser()
                navigate('/my-profile')
            })
            .catch(e => console.log(e))

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleFileInput = (e) => {
        const uploadData = new FormData()

        uploadData.append("imageUrl", e.target.files[0])

        PhotoService
            .uploadAvatar(uploadData)
            .then(cloudUrl => {
                setUser({ ...user, avatar: cloudUrl })
                setCanClick(true)
            })
            .catch(e => console.log(e))
    }

    return (
        <div className='mt-5'>
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1>Edit Profile</h1>
                        <hr />
                        <Form onSubmit={handleSubmit}>

                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" value={username} onChange={handleInputChange} name="username" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="avatar">
                                <Form.Label>Avatar</Form.Label>
                                <Form.Control type="file" onChange={handleFileInput} name="avatar" />
                            </Form.Group>

                            <div className="d-grid">
                                <Button className='SubmitBtn mt-3' disabled={!canClick} variant="dark" type="submit">Edit Profile</Button>
                            </div>

                        </Form>
                    </Col>
                </Row>
            </Container >
        </div>
    )
}

export default ProfileEditPage