import './NavBar.css'
import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import { MessageContext } from '../../context/userMessage.context';
import PhotoService from '../../services/photos.service';
import UploadModal from '../UploadModal/UploadModal';
import Loader from '../Loader/Loader'
import { useNavigate } from 'react-router-dom';

function NavBar() {

    const { user, isLoading, logoutUser, getToken } = useContext(AuthContext)
    const [newPhoto, setNewPhoto] = useState({ url: "" })
    const [token, setToken] = useState("")
    const [data, setData] = useState([])

    const [canClick, setCanClick] = useState(false)
    const navigate = useNavigate()
    const { show, setShow, setShowMessage, handleClose, handleShow } = useContext(MessageContext)

    useEffect(() => {
        const token = getToken()
        setToken(token)
    }, [user])

    useEffect(() => {
        setCanClick(true)
    }, [data])

    const logout = () => {
        setShowMessage({ show: true, title: '👋 See you buddy!', text: "Keep being picky" })
        logoutUser()
    }

    const handleFileInput = (e) => {
        e.preventDefault()

        console.log("ENTRO????")

        PhotoService
            .uploadPhoto(data, token)
            .then(({ _id }) => {
                console.log("LMAO")
                navigate(`/photo/${_id}`)
            })
            .catch(e => console.log(e))
    }

    const handleUrlChange = ({ target }) => {

        const uploadData = new FormData()

        uploadData.append("imageUrl", target.files[0])

        setData(uploadData)
    }

    const updateModal = () => {
        setShow(true)
        setCanClick(false)
    }

    return (
        <>
            <Navbar className='NavBar' bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Picky_</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/feed">Feed</Nav.Link>
                        <Nav.Link onClick={() => updateModal()}>Post</Nav.Link>
                        <Nav.Link href="/explorer">Explore</Nav.Link>
                        <NavDropdown title="User" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                            <NavDropdown.Item href="/register">
                                Signup
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/my-profile">My Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logout} href="#">Logout</NavDropdown.Item>
                        </NavDropdown>
                        {
                            user &&
                            <Nav.Link href="/my-profile">
                                {
                                    !isLoading
                                        ?
                                        <img className='avatar' style={{ width: "30px", borderRadius: "50%" }} src={user?.avatar} alt="avatar" />
                                        :
                                        <Loader />
                                }
                            </Nav.Link>
                        }
                    </Nav>
                </Container>
            </Navbar>

            <UploadModal
                show={show} handleClose={handleClose}
                handleShow={handleShow} canClick={canClick}
                handleFileInput={handleFileInput}
                handleModalChange={handleUrlChange}
                title={"Let's get Picky!"}
                setCanClick={setCanClick}
            >Upload Photo!</UploadModal>
        </>
    );
}

export default NavBar;