import './LoginPage.css'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import { MessageContext } from '../../context/userMessage.context'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Form, Button, Container } from 'react-bootstrap'
import authService from '../../services/auth.service'
import Toast from '../../components/Toast/Toast'
import ErrorCluster from '../../components/ErrorMessage/ErrorMessage'

const LoginPage = () => {

    const [username, setUsername] = useState({ email: "", password: "" })

    const { email, password } = username

    const { storeToken, authenticateUser } = useContext(AuthContext)

    const { setShowMessage } = useContext(MessageContext)

    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        authService
            .login(username)
            .then((authToken) => {
                storeToken(authToken)
                authenticateUser()
                setShowMessage({
                    show: true,
                    title: "Welcome home ✔",
                    text: "Let's get picky"
                })
                navigate('/my-profile')
            })
            .catch(({ response: { data: { err } } }) => {
                setErrors(err)
            })
    }

    const handleInputChange = (e) => {
        const { value, name } = e.target

        setUsername({ ...username, [name]: value })
    }

    return (
        <div className='LoginPage'>
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1>Login</h1>
                        <hr />
                        <Form onSubmit={handleSubmit}>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={email} onChange={handleInputChange} name="email" required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={password} onChange={handleInputChange} name="password" required />
                            </Form.Group>

                            <div className="d-grid">
                                <Button className='SubmitBtn mt-3' variant="dark" type="submit">Login</Button>
                            </div>

                            {
                                errors.length ?
                                    <ErrorCluster errors={errors} />
                                    :
                                    null
                            }
                        </Form>
                    </Col>
                </Row>
            </Container >

            <Toast />

        </div>
    )
}

export default LoginPage