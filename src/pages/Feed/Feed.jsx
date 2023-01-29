import './Feed.css'
import UserService from '../../services/users.service'
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import UsersService from '../../services/users.service'

const Feed = () => {

    const [friendsPhotos, setFriendsPhotos] = useState([])
    const [token, setToken] = useState("")

    const { getToken, user, authenticateUser } = useContext(AuthContext)

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

    useEffect(() => {
        console.log(user)
    }, [user])

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

    return (
        <div className='FeedPage'>
            {
                friendsPhotos.map(({ _id, url, createdAt, author: { avatar, username } }) => {
                    return (
                        <a key={_id} href={`/photo/${_id}`}>
                            <div>
                                <img style={{ width: "50px", height: "50px", borderRadius: "50%" }} src={avatar} alt="avatar" />
                                <span>{username}</span>
                                <img src={url} alt="" />
                                <span>{Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000 / 60)} minutes</span>
                                {
                                    checkIfFavorite(_id) ?
                                        <AiFillHeart onClick={() => dislike(_id)} color='red' size="30px" style={{ cursor: "pointer" }} />
                                        :
                                        <AiOutlineHeart onClick={() => likePhoto(_id)} color='red' size="30px" style={{ cursor: "pointer" }} />
                                }
                            </div>
                            <hr />
                        </a>
                    )
                })
            }
        </div>
    )
}

export default Feed