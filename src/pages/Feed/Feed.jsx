import './Feed.css'
import UserService from '../../services/users.service'
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import AvatarImage from '../../components/Avatar/Avatar'
import getHumanTime from '../../utils/getHumanTime'
import Loader from '../../components/Loader/Loader'
import NoFriendsMessage from '../../components/NoFriendsMessage/NoFriendsMessage'

const Feed = () => {

    const [friendsPhotos, setFriendsPhotos] = useState([])
    const [token, setToken] = useState("")
    const [showHeart, setShowHeart] = useState(false);

    const { getToken, isLoading, user, authenticateUser } = useContext(AuthContext)

    useEffect(() => {
        const token = getToken()
        setToken(token)

        getFriendsPhotos(token)
    }, [])

    const getFriendsPhotos = (token) => {
        UserService
            .getFriendsPhotos(token)
            .then(photos => {
                setFriendsPhotos(photos)
            })
            .catch(e => console.log(e))
    }

    const likePhoto = (id) => {
        UserService
            .likePhoto(id, token)
            .then(() => authenticateUser())
            .catch(e => console.log(e))
    }

    const dislike = (id) => {
        UserService
            .dislikePhoto(id, token)
            .then(() => authenticateUser())
            .catch(e => console.log(e))
    }

    const checkIfFavorite = (id) => {
        return user.favoritePhotos.includes(id)
    }

    useEffect(() => {
        console.log(showHeart)
    }, [showHeart])

    const triggerLike = (id) => {
        likePhoto(id)
        setShowHeart(true)
    }

    const triggerDislike = (id) => {
        dislike(id)
        setShowHeart(false)
    }

    return (
        <>
            {
                isLoading || !friendsPhotos.length ? <Loader />
                    :
                    !friendsPhotos.length ? <NoFriendsMessage />
                        :
                        <div className='FeedPage mt-5'>
                            {
                                friendsPhotos.map(({ _id, url, createdAt, author: { avatar, username, _id: author_id } }) => {
                                    return (
                                        <div key={_id}>
                                            <div>
                                                <div className="InfoBlock mb-3">
                                                    <a href={`/profile/${author_id}`}>
                                                        <AvatarImage src={avatar} />
                                                    </a>
                                                    <a href={`/profile/${author_id}`}>
                                                        <span className='ms-3'>{username}</span>
                                                    </a>
                                                </div>

                                                <div className="ImageCard">
                                                    <img onDoubleClick={() => {
                                                        checkIfFavorite(_id)
                                                            ?
                                                            triggerDislike(_id)
                                                            :
                                                            triggerLike(_id)

                                                    }} src={url} alt="image" />
                                                </div>

                                                <div className='PhotoDetails mt-3'>
                                                    <div>
                                                        <span> {getHumanTime(Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000 / 60))}</span>
                                                        {
                                                            checkIfFavorite(_id) ?
                                                                <AiFillHeart className='HeartLogo ms-3' onClick={() => dislike(_id)} color='red' size="30px" style={{ cursor: "pointer" }} />
                                                                :
                                                                <AiOutlineHeart className='HeartLogo ms-3' onClick={() => likePhoto(_id)} color='red' size="30px" style={{ cursor: "pointer" }} />
                                                        }
                                                    </div>
                                                    <a key={_id} href={`/photo/${_id}`}>
                                                        <span className='btn btn-light me-3'>View Details</span>
                                                    </a>

                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    )
                                })
                            }
                        </div >
            }
        </>
    )
}

export default Feed