import './PhotoPage.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import CommentsService from '../../services/comments.service'
import PhotoService from '../../services/photos.service'
import UsersService from '../../services/users.service'
import { AuthContext } from '../../context/auth.context'
import { MessageContext } from '../../context/userMessage.context'
import { BsFillTrashFill, BsEraserFill } from 'react-icons/bs';
import { Form, Button } from 'react-bootstrap'
import { AiOutlineHeart, AiFillHeart, AiFillEdit } from 'react-icons/ai'
import EditModal from '../../components/Modal/Modal'
import Loader from '../../components/Loader/Loader'

const PhotoPage = () => {

    const [photo, setPhoto] = useState({ _id: "", url: "", comments: [], createdAt: "" })
    const { _id, url, comments, createdAt } = photo

    const [token, setToken] = useState("")
    const [hasLikes, setHasLikes] = useState(false)

    const [comment, setComment] = useState({ description: "" })
    const { description } = comment

    const [editedComment, setEditedComment] = useState({ description: "" })

    const { getToken, user, isLoading } = useContext(AuthContext)
    const { photo_id } = useParams()

    const { show, setShow, setShowMessage, handleClose, handleShow } = useContext(MessageContext)
    const navigate = useNavigate()

    useEffect(() => {
        getCommentedPhoto()
        getAuthToken()
        getLikedPhotos()
    }, [user])

    const getCommentedPhoto = () => {
        CommentsService
            .getCommentedPhoto(photo_id)
            .then(photo => {
                setPhoto(photo)
            })
            .catch(e => console.log(e))
    }

    const getAuthToken = () => {
        const token = getToken()
        setToken(token)
    }

    const getLikedPhotos = () => {
        user &&
            PhotoService
                .getLikedPhotos(user?._id)
                .then(photos => {
                    photos.forEach(({ _id }) => {
                        if (_id === photo_id) setHasLikes(true)
                    })
                })
                .catch(e => console.log(e))
    }

    const likePhoto = () => {
        console.log(token)
        console.log('LIKEEEEE')
        UsersService
            .likePhoto(photo_id, token)
            .then((user) => {
                setHasLikes(true)
                console.log("EL USER QUEDA ASÍ!!!", user)
            })
            .catch(e => console.log(e))
    }

    const dislikePhoto = () => {
        UsersService
            .dislikePhoto(photo_id, token)
            .then((user) => {
                setHasLikes(false)
                console.log("EL USER QUEDA ASÍ!!!", user)
            })
            .catch(e => console.log(e))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        CommentsService
            .postComment(photo_id, token, comment)
            .then(() => {
                return CommentsService.getCommentedPhoto(photo_id)
            })
            .then(photo => {
                setPhoto(photo)
                setComment({ description: "" })
            })
            .catch(e => console.log(e))
    }

    const deleteComment = (id) => {
        CommentsService
            .deleteComment(id, photo_id)
            .then(() => {
                CommentsService
                    .getCommentedPhoto(photo_id)
                    .then(photo => {
                        setPhoto(photo)
                    })
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e))
    }

    const handleInputChange = ({ target }) => {
        const { name, value } = target

        setComment({ ...comment, [name]: value })
    }

    const handleDescriptionChange = ({ target }) => {
        const { name, value } = target

        setEditedComment({ ...editedComment, [name]: value })
    }

    const handleEditSubmit = (e) => {
        e.preventDefault()

        CommentsService
            .editComment(editedComment._id, editedComment)
            .then(() => {
                getCommentedPhoto(photo_id)
            })
            .catch(e => console.log(e))
    }

    const deletePhoto = (id) => {
        PhotoService
            .deletePhoto(id)
            .then(({ msg }) => {
                setShowMessage({
                    show: true,
                    title: 'Congrats 😀',
                    text: `${msg}`
                })
                navigate('/my-profile')
            })
            .catch(e => console.log(e))
    }

    return (
        <>
            {
                isLoading ? <Loader />
                    :
                    <div className='PhotoPage'>

                        <img style={{ width: "200px" }} src={url} alt="" />
                        <br />
                        {
                            !hasLikes ?
                                <AiOutlineHeart onClick={likePhoto} size="30px" color="red" style={{ cursor: "pointer" }} />
                                :
                                <AiFillHeart onClick={dislikePhoto} size="30px" color="red" style={{ cursor: "pointer" }} />
                        }
                        <BsEraserFill onClick={() => deletePhoto(photo_id)} style={{ cursor: "pointer" }} size="30px" />
                        <p>Created At: {new Date(createdAt).toLocaleString()}</p>
                        <div className="comments">
                            {
                                comments.map(({ _id, description, author: { username, avatar, _id: commentUser_id } }) => {
                                    return (
                                        <div key={_id} className="comment">
                                            <span>{description}</span>
                                            {
                                                user?._id === commentUser_id &&
                                                <>
                                                    <BsFillTrashFill style={{ cursor: "pointer" }} onClick={() => deleteComment(_id)} />
                                                    <AiFillEdit style={{ cursor: "pointer" }} onClick={() => {
                                                        setShow(true)
                                                        CommentsService
                                                            .getSingleComment(_id)
                                                            .then(comment => {
                                                                setEditedComment(comment)
                                                            })
                                                            .catch(e => console.log(e))
                                                    }} />
                                                </>

                                            }
                                            <span>{username}</span>
                                            {
                                                <a href={user?._id === commentUser_id ? "/my-profile" : `/profile/${commentUser_id}`}><img style={{ width: "40px", height: "40px", borderRadius: "50%" }} src={avatar} alt="" /></a>
                                            }
                                            <hr />
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Control type="text" value={description} onChange={handleInputChange} name='description' />
                            </Form.Group>
                            <Button variant="dark" type="submit">Post comment</Button>
                        </Form>

                        <EditModal show={show} handleClose={handleClose}
                            handleShow={handleShow} description={editedComment?.description} handleModalSubmit={handleEditSubmit}
                            handleModalChange={handleDescriptionChange} title={"Edit your comment!"}>Description</EditModal>
                    </div>
            }
        </>
    )
}

export default PhotoPage