import './RegisterPage.css'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Form, Button, Container } from 'react-bootstrap'
import { MessageContext } from '../../context/userMessage.context'
import AuthService from '../../services/auth.service'
import PhotoService from '../../services/photos.service'

const RegisterPage = () => {

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    })

    const [canClick, setCanClick] = useState(false)

    const { username, email, password } = user

    const navigate = useNavigate()

    const { setShowMessage } = useContext(MessageContext)

    const handleSubmit = (e) => {
        e.preventDefault()

        AuthService
            .signup(user)
            .then(() => {
                setShowMessage({
                    show: true,
                    title: "Congratulations ✔",
                    text: "Start sharing photos"
                })
                navigate('/login')
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
        <div className='RegisterPage'>
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1>Start Sharing</h1>
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

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="avatar">
                                <Form.Label>Avatar</Form.Label>
                                <Form.Control type="file" onChange={handleFileInput} name="avatar" />
                            </Form.Group>

                            <div className="d-grid">

                                <div className="d-grid">
                                    <Button className='SubmitBtn mt-3' disabled={!canClick} variant="dark" type="submit">Register</Button>
                                </div>
                            </div>

                        </Form>
                    </Col>
                </Row>
            </Container >
        </div>
    )
}

export default RegisterPage