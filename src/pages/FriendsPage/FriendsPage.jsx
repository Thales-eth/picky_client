import './FriendsPage.css'
import { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import usersService from '../../services/users.service'
import Loader from '../../components/Loader/Loader'
import AvatarImage from '../../components/Avatar/Avatar'
import NoFriendsMessage from '../../components/NoFriendsMessage/NoFriendsMessage'

const FriendsPage = () => {

    const { user_id } = useParams()

    const [friends, setFriends] = useState([])
    const [newFriends, setNewFriends] = useState([])
    const [token, setToken] = useState("")

    const { getToken, isLoading } = useContext(AuthContext)

    const checkIfFriends = (id) => {
        const mappedFriends = newFriends.map(({ _id }) => _id)
        return mappedFriends.includes(id)
    }

    useEffect(() => {
        usersService
            .getFriends(user_id)
            .then(friends => {
                setFriends(friends)
                setNewFriends(friends)
            })
            .catch(e => console.log(e))

        const token = getToken()
        setToken(token)
    }, [])

    const unfollowUser = (id) => {
        usersService
            .unfollowUser(id, token)
            .then((friends) => {
                setNewFriends(friends)
            })
            .catch(e => console.log(e))
    }

    const followUser = (id) => {
        usersService
            .followUser(id, token)
            .then((friends) => {
                setNewFriends(friends)
            })
            .catch(e => console.log(e))
    }

    return (
        <>
            {
                !isLoading ?
                    <div className='friendsPage mt-5' >
                        {
                            !friends.length ?
                                <NoFriendsMessage />
                                :
                                friends.map(({ _id, avatar, username }) => {
                                    return (
                                        <div key={_id}>
                                            <div className='FriendGrid'>
                                                <Link to={`/profile/${_id}`} >
                                                    <div className='InfoBlock'>
                                                        <AvatarImage src={avatar} />
                                                        <p className='ms-3'>{username}</p>
                                                    </div>
                                                </Link>
                                                {
                                                    checkIfFriends(_id) ?
                                                        <a onClick={() => unfollowUser(_id)} className="UnfollowBtn btn btn-light me-3">Unfollow</a>
                                                        :
                                                        <a onClick={() => followUser(_id)} className="FollowBtn btn btn-primary me-3">Follow</a>
                                                }
                                            </div>
                                            < hr />
                                        </div>
                                    )
                                })
                        }
                    </div >
                    :
                    <Loader />
            }
        </>
    )
}

export default FriendsPage