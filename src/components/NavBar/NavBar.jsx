import './NavBar.css'
import pickyLogo from './assets/pickylogo.png'
import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import { MessageContext } from '../../context/userMessage.context';
import Avatar from '../Avatar/Avatar';
import PhotoService from '../../services/photos.service';
import UploadModal from '../UploadModal/UploadModal';
import Loader from '../Loader/Loader'
import { AiOutlineCloudUpload } from 'react-icons/ai'
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

        PhotoService
            .uploadPhoto(data, token)
            .then(({ _id }) => {
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
            <Navbar className='NavBar' variant="dark">
                <Container className='NavContainer'>
                    <Navbar.Brand href="/">
                        <div className='navLogo'>
                            <span>写真</span>
                        </div>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/feed">Feed</Nav.Link>
                        <Nav.Link href="/explorer">Explore</Nav.Link>
                        <Nav.Link onClick={() => updateModal()}>
                            <AiOutlineCloudUpload size={30} />
                        </Nav.Link>
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
                                        <Avatar src={user?.avatar} />
                                        :
                                        <Loader />
                                }
                            </Nav.Link>
                        }
                    </Nav>
                </Container>
            </Navbar>

            <UploadModal
                canClick={canClick}
                show={show} handleClose={handleClose}
                handleShow={handleShow}
                handleFileInput={handleFileInput}
                handleModalChange={handleUrlChange}
                title={"Let's get Picky!"}
                setCanClick={setCanClick}
            >Upload Photo!</UploadModal>
        </>
    );
}

export default NavBar;