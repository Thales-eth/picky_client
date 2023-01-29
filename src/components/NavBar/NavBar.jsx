import './NavBar.css'
import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { MessageContext } from '../../context/userMessage.context';
import Loader from '../Loader/Loader'

function NavBar() {

    const { user, isLoading, logoutUser } = useContext(AuthContext)
    const { setShowMessage } = useContext(MessageContext)
    // 
    const logout = () => {
        setShowMessage({ show: true, title: '👋 See you buddy!', text: "Nyan (●'◡'●)" })
        logoutUser()
    }

    return (
        <>
            <Navbar className='NavBar' bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Picky_</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/feed">Feed</Nav.Link>
                        <Nav.Link href="/post">Post</Nav.Link>
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
        </>
    );
}

export default NavBar;